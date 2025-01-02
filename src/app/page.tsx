import Image from 'next/image'

interface CardData {
  heading: string
  benefits?: string
  stack?: string[]
}

type BackgroundColor =
  | 'liliac'
  | 'orange'
  | 'card'
  | 'blue'
  | 'lime'
  | 'cardDark'

interface SolutionCardData {
  bg: BackgroundColor
  pic: string
  title: string
  card: CardData
}

interface SolutionCardProps {
  bg: BackgroundColor
  pic: string
  title: string
  card: CardData
  index: number
}

const cards: SolutionCardData[] = [
  {
    bg: 'liliac',
    pic: './cover.png',
    title: 'Backend Solutions Development',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
  {
    bg: 'orange',
    pic: './cover-1.png',
    title: 'Default Title',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
  {
    bg: 'card',
    pic: './cover-2.png',
    title: 'Default Title',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
  {
    bg: 'blue',
    pic: './cover-3.png',
    title: 'Default Title',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
  {
    bg: 'lime',
    pic: './cover-4.png',
    title: 'Default Title',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
  {
    bg: 'cardDark',
    pic: './cover-5.png',
    title: 'Default Title',
    card: {
      heading: 'Default Heading',
      benefits: 'Default Benefits',
      stack: ['Jenkins', 'Kubernetes'],
    },
  },
]

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
      <span>yo</span>
    </div>
  )
}

const SolutionCard = ({
  bg = 'blue',
  pic = 'default-pic',
  title = 'Default Title',
  card = {
    heading: 'Default Heading',
    benefits: 'Default Benefits',
    stack: ['Jenkins', 'Kubernetes'],
  },
  index,
}: SolutionCardProps) => {
  return (
    <div
      className={`w-[calc(100%-60px)] m-[30px] min-h-[700px] mb-0 h-64 flex justify-between items-end bg-${bg} rounded-[32px] relative`}
    >
      <img src={`/img/desktop-covers/${pic}`} />
      <Title dark={bg === 'cardDark'}>{title}</Title>
      <Number number={index + 1} />
      <CTA />
    </div>
  )
}

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
    hover:shadow-xl hover:-translate-y-2
    hover:shadow-black/20
  `}
  >
    explore the case study
  </button>
)

// const CTA = () => (
//   <button className="px-[35px] py-[21px] font-host text-[20px] leading-none font-medium bg-black rounded-[32px] absolute bottom-[27px] right-[27px]">
//     explore the case study
//   </button>
// )

const Title = ({ children, dark }: { children?: string; dark?: boolean }) => (
  <div
    className={`${dark ? 'text-white' : 'text-black'} text-6xl font-medium not-italic leading-none font-host absolute left-[38px] bottom-[40px]`}
  >
    {children}
  </div>
)

const Number = ({ number = 0 }: { number: number }) => (
  <div className="absolute top-0 left-0 w-[100px] h-[100px] flex items-center justify-center font-medium font-host text-[40px] bg-black rounded-[32px]">
    {number}
  </div>
)
