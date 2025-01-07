import React from 'react'

interface RayProps {
  angle: number
  isOuterRay: boolean
}

const Ray: React.FC<RayProps> = ({ angle, isOuterRay }) => (
  <div
    className="absolute"
    style={{
      height: '2px',
      width: '100px',
      background: 'rgb(240, 240, 245)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `
        rotate(${angle}deg)
        translate(${isOuterRay ? '100px' : '50px'}, -50%)
      `,
    }}
  />
)

const RayBackground: React.FC = () => {
  const angles: number[] = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* First layer - rays positioned further from center */}
      <div className="absolute inset-0 scale-primary">
        {angles.map((angle) => (
          <Ray key={`primary-${angle}`} angle={angle} isOuterRay={true} />
        ))}
      </div>
      {/* Second layer - rays positioned closer to center */}
    </div>
  )
}

export default RayBackground
