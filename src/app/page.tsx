import Image from 'next/image'
import { cards } from '@/data'
import { SolutionCardProps, CardData } from '@/types'

import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-background">
      {cards.map((i, index) => (
        <SolutionCard
          key={`${index}.${i.bg}`}
          index={index}
          bg={i.bg}
          pic={i.pic}
          title={i.title}
          card={i.card}
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
  bg = 'blue',
  pic = 'default-pic',
  title = 'Default Title',
  card = {
    heading: 'Default Heading',
    benefits: ['Default Benefits'],
    stack: ['Jenkins', 'Kubernetes'],
  },
  index,
}: SolutionCardProps) => {
  const isDark = bg === 'cardDark'
  return (
    <div
      className={`w-[calc(100%-60px)] m-[30px] min-h-[700px] mb-0 h-64 flex justify-between items-end bg-${bg} rounded-[32px] relative`}
    >
      <img src={`/img/desktop-covers/${pic}`} />
      <Title isDark={isDark}>{title}</Title>
      <Number number={index + 1} />
      <CTA />
      <Card card={card} isDark={isDark} />
    </div>
  )
}

const Card = ({ card, isDark }: { card: CardData; isDark?: boolean }) => {
  return (
    <div
      className={`card flex flex-col absolute top-0 right-0  rounded-[32px] border border-[#FFFFFF60] backdrop-blur-[150px] w-[494px] p-[46px] gap-y-[40px] ${isDark ? 'bg-[#FFFFFF05] text-white' : 'bg-[#FFFFFF20] text-black'}`}
    >
      <span className="font-host font-[500] text-[24px] leading-none">
        {card.heading}
      </span>
      {card.benefits && (
        <div className="flex flex-col gap-y-[12px]">
          <Label>Key Benefits</Label>
          <div className="flex flex-col gap-y-[8px]">
            {card.benefits.map((benefitItem) => (
              <span className="font-host text-[14px] font-[500] leading-none">
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
              <span className="flex items-center justify-center h-[24px] font-space text-[12px] font-[500] leading-none bg-white rounded-[9px] px-[12px]">
                {stackItem}
              </span>
            ))}
          </div>
        </div>
      )}
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
    absolute bottom-[27px] right-[27px]
    bg-black
    rounded-full
    shadow-none
    transition-all duration-300 ease-in-out
    hover:bg-white hover:text-black
    hover:shadow-lg hover:-translate-y-2
    hover:shadow-black/20
    text-white
  `}
  >
    explore the case study
  </button>
)

const Title = ({
  children,
  isDark,
}: {
  children?: string
  isDark?: boolean
}) => (
  <div
    className={`max-w-[742px] ${isDark ? 'text-white' : 'text-black'} text-[64px] font-medium not-italic leading-none font-host absolute left-[38px] bottom-[40px]`}
  >
    {children}
  </div>
)

const Number = ({ number = 0 }: { number: number }) => (
  <div className="absolute top-0 left-0 w-[100px] h-[100px] flex items-center justify-center font-medium font-host text-[40px] bg-black rounded-[32px] text-white">
    {number}
  </div>
)
