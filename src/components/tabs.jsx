import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(
    items.find((item) => item.active)?.text || items[0]?.text
  )
  const [activeTabWidth, setActiveTabWidth] = useState(0)
  const [activeTabLeft, setActiveTabLeft] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const tabRefs = useRef([])
  const isFirstInteraction = useRef(true)

  useEffect(() => {
    const activeTabIndex = items.findIndex((item) => item.text === activeTab)
    const activeTabElement = tabRefs.current[activeTabIndex]
    if (activeTabElement) {
      const { width, left } = activeTabElement.getBoundingClientRect()
      const parentLeft =
        tabRefs.current[0].parentElement.getBoundingClientRect().left
      setActiveTabWidth(width)
      setActiveTabLeft(left - parentLeft - 2)

      // Only show the component when we have the initial measurements
      if (!isReady) {
        setIsReady(true)
      }
    }
  }, [activeTab, items, isReady])

  const getTransition = () => ({
    type: 'spring',
    stiffness: 500,
    damping: 35,
  })

  const renderTabItem = (item, index) => {
    const commonClasses = `relative px-3.5 py-2.5 text-sm font-medium z-10 rounded-full whitespace-nowrap
      mix-blend-difference text-white`

    if (item.type === 'link') {
      return (
        <Link
          key={item.text}
          href={item.href}
          ref={(el) => (tabRefs.current[index] = el)}
          onClick={() => {
            isFirstInteraction.current = false
            setActiveTab(item.text)
          }}
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
          isFirstInteraction.current = false
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
    <div className="relative" style={{ opacity: isReady ? 1 : 0 }}>
      <div className="relative flex gap-3 rounded-full bg-gray-100 p-0.5 w-fit">
        <motion.div
          className="absolute h-full top-0"
          initial={false}
          animate={{
            x: activeTabLeft,
            width: activeTabWidth,
          }}
          transition={
            isFirstInteraction.current ? { duration: 0 } : getTransition()
          }
        >
          <div className="h-full w-full rounded-full bg-black" />
        </motion.div>
        {items.map((item, index) => renderTabItem(item, index))}
      </div>
    </div>
  )
}

export default Tabs
