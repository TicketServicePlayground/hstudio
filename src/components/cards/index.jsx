'use client'
import CardsMobile from '@/components/cards/mobile'
import CardsDesktop from '@/components/cards/desktop'

import { useIsMobile } from '@/hooks'

import { cards } from '@/data'

const Cards = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <CardsMobile cards={cards} />
  } else {
    return <CardsDesktop cards={cards} />
  }
}

export default Cards
