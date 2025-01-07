export interface SolutionCardData {
  bg: BackgroundColor
  pic: string
  title: string
  card: CardData
  mobileTitleOffset: number
}

export interface CardData {
  heading: string
  benefits?: string[]
  stack?: string[]
}

export type BackgroundColor =
  | 'liliac'
  | 'orange'
  | 'card'
  | 'blue'
  | 'lime'
  | 'cardDark'

export interface SolutionCardProps extends SolutionCardData {
  index: number
}
