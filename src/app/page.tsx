'use client'
import Image from 'next/image'
import { cards } from '@/data'
import { SolutionCardProps, CardData } from '@/types'
import { useIsMobile } from '@/hooks'

import Footer from '@/components/footer'

const Hero = () => (
  <div className="relative">
    <Header />

    <Circle />

    <HeroHeading></HeroHeading>

    <HeroTags>
      <HeroTag></HeroTag>
    </HeroTags>

    <div>
      <HeroText></HeroText>
      <HeroCTA />
    </div>

    <LogoMarquee />
  </div>
)

const Header = () => {
  return (
    <div className="absolute w-full top-[30px] px-[30px] flex justify-between items-center">
      <Tabs
        items={[
          {
            text: 'clients',
            type: 'link',
            href: '/clients',
          },
          {
            text: 'about us',
            type: 'link',
            href: '/about',
          },
          {
            text: 'contacts',
            type: 'link',
            href: '/contacts',
          },
        ]}
      />
      <div className="flex flex-row-reverse">
        <Tabs
          items={[
            {
              text: 'eng',
              type: 'btn',
              onClick: () => {},
            },
            {
              text: 'deu',
              type: 'btn',
              onClick: () => {},
            },
          ]}
        />
        <Logo />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-background">
      {/*
      <Hero />
      */}
      {cards.map((i, index) => (
        <SolutionCard
          key={`${index}.${i.bg}`}
          index={index}
          bg={i.bg}
          pic={i.pic}
          title={i.title}
          card={i.card}
          mobileTitleOffset={i.mobileTitleOffset}
        />
      ))}
      <div className="w-full h-[808px] flex items-center justify-center">
        <p className="block md:hidden text-black font-medium font-host text-[24px] leading-none text-center">
          We are{' '}
          <span className="text-blue">
            flexible and
            <br />
            collaborate
          </span>{' '}
          with trusted
          <br />
          partners to bring your
          <br />
          <span className="text-lime">vision to life</span>
          . While we
          <br />
          specialize in key areas,
          <br />
          we’re open to exploring
          <br />
          <span className="text-orange">new challenges</span> and
          <br />
          delivering tailored
          <br />
          solutions to meet your
          <br />
          <span className="text-liliac">unique project needs</span>
        </p>
        <p className="hidden md:block text-black font-medium font-host text-[48px] leading-none text-center">
          We are <span className="text-blue">flexible and collaborate</span>{' '}
          with trusted
          <br />
          partners to bring your{' '}
          <span className="text-lime">vision to life</span>
          . While we
          <br />
          specialize in key areas, we’re open to exploring
          <br />
          <span className="text-orange">new challenges</span> and delivering
          tailored solutions
          <br />
          to meet your <span className="text-liliac">unique project needs</span>
        </p>
      </div>
      <Footer />
    </div>
  )
}

const SolutionCard = ({
  bg,
  pic,
  title,
  card,
  index,
  mobileTitleOffset,
}: SolutionCardProps) => {
  const isDark = bg === 'cardDark'
  const isMobile = useIsMobile()

  return (
    <div
      className={`
        w-full 
        md:w-[calc(100%-60px)]

        m-[0px]
        md:m-[30px]

        rounded-[20px]
        md:rounded-[32px]

        h-full
        min-h-[700px] mb-0 bg-${bg} relative

        flex flex-col
        md:block

        ${index === 0 ? 'mt-[0px]' : 'mt-[-60px]'}
        md:mt-[unset]
      `}
    >
      <img
        src={`/img/${isMobile ? 'mobile' : 'desktop'}-covers/${pic}`}
        className={isMobile ? 'absolute top-0 w-full' : ''}
        alt={title}
      />
      <Number number={index + 1} />
      <Title isDark={isDark} mobileTitleOffset={mobileTitleOffset}>
        {title}
      </Title>
      <div className="absolute bottom-[27px] right-[27px] hidden md:block">
        <CTA />
      </div>
      <Card card={card} isDark={isDark} />
      {/*
       */}
    </div>
  )
}

const Card = ({ card, isDark }: { card: CardData; isDark?: boolean }) => {
  return (
    <div
      className={`
        card

        flex flex-col

        relative
        md:absolute md:top-0 md:right-0

        rounded-[20px]
        md:rounded-[32px]

        border border-[#FFFFFF60] backdrop-blur-[150px]

        w-full
        md:w-[494px]

        p-[25px]
        md:p-[46px]

        gap-y-[40px]

        pb-[120px]
        md:pb-[25px]

        ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}
      `}
    >
      <span className="font-host font-[500] text-[24px] leading-none">
        {card.heading}
      </span>
      {card.benefits && (
        <div className="flex flex-col gap-y-[12px]">
          <Label>Key Benefits</Label>
          <div className="flex flex-col gap-y-[8px]">
            {card.benefits.map((benefitItem) => (
              <span
                className="font-host text-[14px] font-[500] leading-none"
                key={benefitItem}
              >
                {benefitItem}
              </span>
            ))}
          </div>
        </div>
      )}
      {card.stack && (
        <div className="flex flex-col gap-y-[16px]">
          <Label>Technology Stack</Label>
          <div className="flex flex-wrap gap-[4px]">
            {card.stack.map((stackItem) => (
              <span
                className="flex items-center justify-center h-[24px] font-space text-[12px] font-[500] leading-none bg-white rounded-[9px] px-[12px]"
                key={stackItem}
              >
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="block md:hidden">
        <CTA />
      </div>
    </div>
  )
}

const Label = ({ children }: { children?: string }) => (
  <span className="font-host font-[700] text-[18px] leading-none">
    {children}
  </span>
)

const CTA = () => (
  <button
    className={`
    px-[35px] py-[21px]
    font-host text-[20px] leading-none font-medium
    bg-black rounded-[32px]
    
    bg-black
    rounded-full
    shadow-none
    transition-all duration-300 ease-in-out
    hover:bg-white hover:text-black
    hover:shadow-lg hover:-translate-y-2
    hover:shadow-black/20
    text-white

    w-full
    md:w-[unset]
  `}
  >
    explore the case study
  </button>
)

const Title = ({
  children,
  isDark,
  mobileTitleOffset,
}: {
  children: string
  isDark: boolean
  mobileTitleOffset: number
}) => (
  <div
    className={`
      max-w-[742px]
      font-medium not-italic leading-none font-host ${isDark ? 'text-white' : 'text-black'} 

      relative
      md:absolute

      text-[42px]
      md:text-[64px]

      md:left-[38px]
      md:bottom-[40px]

      mt-[${mobileTitleOffset}px]
      md:mt-[unset]

      ml-[25px]
      md:ml-[0px]

      mb-[44px]
      md:mb-[unset]
      `}
  >
    {children}
  </div>
)

const Number = ({ number = 0 }: { number: number }) => (
  <div className="absolute top-0 left-0 w-[100px] h-[100px] flex items-center justify-center font-medium font-host text-[40px] bg-black rounded-[20px] md:rounded-[32px] text-white">
    {number}
  </div>
)
