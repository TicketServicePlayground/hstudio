'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AnimatedMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-64 h-screen w-screen bg-black">
      {/*
      <div className="card-container">
        <div className="card-border"></div>
        <div className="card">yo</div>
      </div>
      */}
      <div className="cardtwo w-64 h-64 mb-8">
        yo
        <span />
      </div>
      <div className="card w-64 h-64">
        yo
        <span />
      </div>
    </div>
  )
}

export default AnimatedMenuIcon

// import React from 'react'

// interface RayProps {
//   angle: number
//   isOuterRay: boolean
// }

// const Ray: React.FC<RayProps> = ({ angle, isOuterRay }) => (
//   <div
//     className="absolute"
//     style={{
//       height: '2px',
//       width: '100px',
//       background: 'rgb(240, 240, 245)',
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: `
//         rotate(${angle}deg)
//         translate(${isOuterRay ? '100px' : '50px'}, -50%)
//       `,
//     }}
//   />
// )

// const RayBackground: React.FC = () => {
//   const angles: number[] = Array.from({ length: 16 }, (_, i) => i * (360 / 16))

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white">
//       <div className="absolute inset-0 ">
//         {angles
//           .filter((i, ind) => ind % 2 === 0)
//           .map((angle) => (
//             <Ray key={outer-${angle}} angle={angle} isOuterRay={true} />
//           ))}
//       </div>
//       <div className="absolute inset-0 ">
//         {angles
//           .filter((i, ind) => ind % 2 !== 0)
//           .map((angle) => (
//             <Ray key={inner-${angle}} angle={angle} isOuterRay={false} />
//           ))}
//       </div>
//     </div>
//   )
// }

// export default RayBackground
