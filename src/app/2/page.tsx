'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AnimatedMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="relative w-[60px] h-[60px] bg-black rounded-2xl cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <motion.path
          d="M16 22L44 22"
          stroke="white"
          strokeWidth="4"
          style={{ originX: 0.14, originY: 0.5 }}
          animate={{
            rotate: isOpen ? 45 : 0,
            x: isOpen ? 2 : 0,
            y: isOpen ? -1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        <motion.path
          d="M16 30L44 30"
          stroke="white"
          strokeWidth="4"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        <motion.path
          d="M16 38L44 38"
          stroke="white"
          strokeWidth="4"
          style={{ originX: 0.14, originY: 0.5 }}
          animate={{
            rotate: isOpen ? -45 : 0,
            x: isOpen ? 2 : 0,
            y: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

export default AnimatedMenuIcon
