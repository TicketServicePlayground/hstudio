'use client'
import Hero from '@/components/home/hero'
import Cards from '@/components/cards/mobile'
import RayScreen from '@/components/home/ray-screen'
import Footer from '@/components/footer'

import { cards } from '@/data'

const Page = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Cards cards={cards} />
      <RayScreen />
      <Footer />
    </div>
  )
}

export default Page
