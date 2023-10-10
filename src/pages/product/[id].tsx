import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import { formatPrice } from '../../utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  async function handleBuyProduct() {
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      window.location.href = response.data.checkoutUrl
    } catch {
      alert('Falha ao redirecionar ao checkout')
    }
  }

  if (isFallback) return <p>Carregando...</p>

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] mx-auto">
      <div className="w-full max-w-[576px] h-[656px] bg-product rounded-lg p-1 flex items-center justify-center">
        <Image
          width={576}
          height={656}
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl text-gray300">{product.name}</h1>
        <span className="block text-2xl text-green300">{product.price}</span>
        <p className="text-gray300 text-lg">{product.description}</p>
        <button
          className="inline-block bg-green500 text-white rounded-lg p-5 cursor-pointer font-bold text-lg hover:bg-green300"
          onClick={handleBuyProduct}
        >
          Comprar agora
        </button>
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params.id as string

  const _product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = _product.default_price as Stripe.Price

  const product = {
    id: _product.id,
    name: _product.name,
    description: _product.description,
    imageUrl: _product.images[0],
    price: formatPrice(price.unit_amount / 100),
    defaultPriceId: price.id,
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 1,
  }
}
