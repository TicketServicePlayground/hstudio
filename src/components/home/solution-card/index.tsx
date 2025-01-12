export const Label = ({ children }: { children?: string }) => (
  <span className="font-host font-[700] text-[18px] leading-none">
    {children}
  </span>
)

export const CTA = () => (
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

export const Title = ({
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

export const CardNumber = ({ number = 0 }: { number: number }) => (
  <div className="absolute top-0 left-0 w-[100px] h-[100px] flex items-center justify-center font-medium font-host text-[40px] bg-black rounded-[20px] md:rounded-[32px] text-white">
    {number}
  </div>
)

export const InnerCard = ({
  card,
  isDark,
}: {
  card: CardData
  isDark?: boolean
}) => {
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
