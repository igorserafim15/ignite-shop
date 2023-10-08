import { useRouter } from 'next/router'

export default function Product() {
  const { query } = useRouter()

  return <h2>Produto: {query.id}</h2>
}
