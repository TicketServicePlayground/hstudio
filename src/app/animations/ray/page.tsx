import React from 'react'

interface RayProps {
  angle: number
  isOuterRay: boolean
}

const Ray: React.FC<RayProps> = ({ angle, isOdd }) => (
  <div
    className="absolute"
    style={{
      height: '2px',
      width: '100px',
      // background: 'rgb(240, 240, 245)',
      background: isOdd ? 'red' : 'blue',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `
        rotate(${angle}deg)
        translate(${isOdd ? '100px' : '100px'}, -50%)
      `,
    }}
  />
)

const RayBackground: React.FC = () => {
  const angles: number[] = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 ">
        {angles
          .filter((i, ind) => ind % 2 === 0)
          .map((angle) => (
            <Ray key={`primary-${angle}`} angle={angle} isOdd={true} />
          ))}
      </div>
      <div className="absolute inset-0 ">
        {angles
          .filter((i, ind) => ind % 2 !== 0)
          .map((angle) => (
            <Ray key={`primary-${angle}`} angle={angle} isOdd={false} />
          ))}
      </div>
    </div>
  )
}

export default RayBackground
