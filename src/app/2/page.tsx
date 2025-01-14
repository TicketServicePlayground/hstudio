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
