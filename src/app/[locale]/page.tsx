'use client'

import Hero from '@/components/home/hero'
import Cards from '@/components/cards'
import RayScreen from '@/components/home/ray-screen'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Cards />
      <RayScreen />
      <Footer />

    </div>
  )
}

// import {
//   Label,
//   CTA,
//   Title,
//   InnerCard,
//   CardNumber,
// } from '@/components/home/solution-card'
//
// import Image from 'next/image'
// import { cards } from '@/data'
// import { SolutionCardProps, CardData } from '@/types'

// const SolutionCard = ({
//   bg,
//   pic,
//   title,
//   card,
//   index,
//   mobileTitleOffset,
// }: SolutionCardProps) => {
//   const isDark = bg === 'cardDark'
//   const isMobile = useIsMobile()
//   console.log(isMobile)
//   console.log(isMobile)
//   console.log(isMobile)
//   // const { isMobile, initialized } = useIsMobile()

//   // if (!initialized) return null

//   return (
//     <div
//       className={`
//         w-full
//         md:w-[calc(100%-60px)]

//         m-[0px]
//         md:m-[30px]

//         rounded-[20px]
//         md:rounded-[32px]

//         h-full
//         min-h-[700px] mb-0 bg-${bg} relative

//         flex flex-col
//         md:block

//         ${index === 0 ? 'mt-[0px]' : 'mt-[-60px]'}
//         md:mt-[unset]
//       `}
//     >
//       <img
//         src={`/img/${isMobile ? 'mobile' : 'desktop'}-covers/${pic}`}
//         className={isMobile ? 'absolute top-0 w-full' : ''}
//         alt={title}
//       />
//       <CardNumber number={index + 1} />
//       <Title isDark={isDark} mobileTitleOffset={mobileTitleOffset}>
//         {title}
//       </Title>
//       <div className="absolute bottom-[27px] right-[27px] hidden md:block">
//         <CTA />
//       </div>
//       <InnerCard card={card} isDark={isDark} />
//       {/*
//        */}
//     </div>
//   )
// }

// hero issues:
//
// 1280-1024,
// 1024-768,
