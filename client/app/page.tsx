import Container from '@/components/ui/Container'
import Image from 'next/image'
import Features from './components/Features'
import { cookies } from "next/headers";
export default function Home() {
  const token = cookies().get("token")?.value;

  return (
    <Container>
      <main className="flex min-h-screen flex-col py-2">
        <h1 className='text-2xl md:text-6xl text-center font-extrabold text-[#297bfe]'>Poll With Purpose. <br /> <span className='text-[#f4714c]'>Discover Insights Instantly !!
        </span> </h1>
        <p className='text-center mt-5 text-lg text-gray-600 sm:text-xl '>Create unlimited polls and surveys with just a few clicks. Ask the questions you really want answers to. Gain insights from multiple choice votes or open-ended responses.</p>
        <div className='grid place-content-center'>
          <img className='h-[300px] object-cover filter shadow-orange-500 drop-shadow-2xl  ' src="/hero.png" alt="hero" />
        </div>
        <Features />
      </main>
    </Container>
  )

}