import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import { formatPrice } from '../utils'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: { perView: 3, spacing: 48 },
  })

  return (
    <div
      className="flex min-h-[656px] w-full ml-auto max-w-app keen-slider"
      ref={sliderRef}
    >
      {products.map((product) => (
        <Link
          href={`product/${product.id}`}
          key={product.id}
          prefetch={false}
          className="keen-slider__slide bg-product rounded-lg  cursor-pointer relative flex items-center justify-center group overflow-hidden"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={520}
            height={480}
          />

          <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between translate-y-[110%] opacity-0 transition-all ease-in-out group-hover:translate-y-[0%] group-hover:opacity-100 bg-black/50">
            <strong className="tex-lg">{product.name}</strong>
            <span className="text-green300 font-bold text-lg">
              {product.price}
            </span>
          </footer>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: formatPrice(
      (product.default_price as Stripe.Price).unit_amount / 100,
    ),
  }))

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 hourså
  }
}
