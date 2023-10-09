import cam1 from '../assets/camisa-1.png'
import cam2 from '../assets/camisa-2.png'
import cam3 from '../assets/camisa-3.png'

import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex gap-10 min-h-[656px] w-full ml-auto max-w-app">
      <div className="bg-product rounded-lg p-2 cursor-pointer relative flex items-center justify-center">
        <Image src={cam1} alt="" width={520} height={480} />

        <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between translate-y-[110%] opacity-0 transition-all ease-in-out hover:translate-y-[0%] hover:opacity-100">
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </div>

      <div className="bg-product">
        <Image src={cam2} alt="" width={520} height={480} />

        <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between translate-y-[110%] opacity-0 transition-all ease-in-out">
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </div>

      <div className="bg-product">
        <Image src={cam3} alt="" width={520} height={480} />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </div>
    </div>
  )
}
