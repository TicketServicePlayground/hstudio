import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Tabs = ({
  items,
  onReady,
  selectedBgColor = 'black',
  selectedTextColor,
}) => {
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

      if (!isReady) {
        setIsReady(true)
        onReady?.() // Notify parent when ready
      }
    }
  }, [activeTab, items, isReady, onReady])

  const getTransition = () => ({
    type: 'spring',
    stiffness: 500,
    damping: 35,
  })

  const renderTabItem = (item, index) => {
    const commonClasses = `relative px-[14px] py-[10px] text-[16px] font-semibold font-host z-10 rounded-full whitespace-nowrap
    ${selectedTextColor ? `text-${selectedTextColor}` : 'mix-blend-difference text-white'}`

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
      <div className="relative flex gap-3 rounded-full bg-white p-[2px] w-fit">
        <motion.div
          className="absolute h-[calc(100%-4px)] top-[2px]"
          initial={false}
          animate={{
            x: activeTabLeft,
            width: activeTabWidth,
          }}
          transition={
            isFirstInteraction.current ? { duration: 0 } : getTransition()
          }
        >
          <div className={`h-full w-full rounded-full bg-${selectedBgColor}`} />
        </motion.div>
        {items.map((item, index) => renderTabItem(item, index))}
      </div>
    </div>
  )
}

export default Tabs
