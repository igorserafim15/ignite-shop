import logoImage from '../assets/logo.svg'
import '../../globals.css'

import Image from 'next/image'

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen">
      <header className="px-8 w-full max-w-[1180px] mx-auto">
        <Image src={logoImage} alt="Logo" />
      </header>

      <Component {...pageProps} />
    </div>
  )
}
