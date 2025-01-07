import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(
    items.find((item) => item.active)?.text || items[0]?.text
  )
  const [activeTabWidth, setActiveTabWidth] = useState(0)
  const [activeTabLeft, setActiveTabLeft] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const tabRefs = useRef([])
  const isInitialRender = useRef(true)

  useEffect(() => {
    const activeTabIndex = items.findIndex((item) => item.text === activeTab)
    const activeTabElement = tabRefs.current[activeTabIndex]

    if (activeTabElement) {
      const { width, left } = activeTabElement.getBoundingClientRect()
      const parentLeft =
        tabRefs.current[0].parentElement.getBoundingClientRect().left
      setActiveTabWidth(width)
      setActiveTabLeft(left - parentLeft - 2)

      if (!isMounted) {
        setIsMounted(true)
        // setTimeout(() => setIsMounted(true), 300)
      }
    }
  }, [activeTab, items, isMounted])

  const getTransition = () => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return {
        type: 'spring',
        stiffness: 700,
        damping: 30,
        mass: 0.8,
        opacity: { duration: 0.1 },
        scale: { duration: 0.1 },
      }
    }

    return {
      type: 'spring',
      stiffness: 500,
      damping: 35,
    }
  }

  const renderTabItem = (item, index) => {
    const commonClasses = `relative px-3.5 py-2.5 text-sm font-medium z-10 rounded-full whitespace-nowrap
      transition-colors duration-100
      ${activeTab === item.text ? (isMounted ? 'text-white' : 'text-gray-700') : 'text-gray-700'}`

    if (item.type === 'link') {
      return (
        <Link
          key={item.text}
          href={item.href}
          ref={(el) => (tabRefs.current[index] = el)}
          onClick={() => setActiveTab(item.text)}
          className={commonClasses}
        >
          {item.text}
        </Link>
      )
    }

    return (
      <button
        key={item.text}
        ref={(el) => (tabRefs.current[index] = el)}
        onClick={() => {
          setActiveTab(item.text)
          item.onClick?.()
        }}
        className={commonClasses}
      >
        {item.text}
      </button>
    )
  }

  return (
    <div className="relative">
      <div className="relative flex gap-3 rounded-full bg-gray-100 p-0.5 w-fit">
        <AnimatePresence mode="wait">
          {isMounted && (
            <motion.div
              className="absolute h-full top-0"
              initial={{
                x: activeTabLeft,
                width: activeTabWidth,
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                x: activeTabLeft,
                width: activeTabWidth,
                opacity: 1,
                scale: 1,
              }}
              transition={getTransition()}
            >
              <div className="h-full w-full rounded-full bg-black" />
            </motion.div>
          )}
        </AnimatePresence>
        {items.map((item, index) => renderTabItem(item, index))}
      </div>
    </div>
  )
}

export default Tabs
