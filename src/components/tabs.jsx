import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Tabs = ({
  items,
  onReady,
  selectedBgColor = 'black',
  selectedTextColor,
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    const activeItem = items.find((item) => item.active)
    return activeItem?.text || null
  })
  const [activeTabWidth, setActiveTabWidth] = useState(0)
  const [activeTabLeft, setActiveTabLeft] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const tabRefs = useRef([])
  const isFirstInteraction = useRef(true)

  useEffect(() => {
    if (activeTab) {
      const activeTabIndex = items.findIndex((item) => item.text === activeTab)
      const activeTabElement = tabRefs.current[activeTabIndex]
      if (activeTabElement) {
        const { width, left } = activeTabElement.getBoundingClientRect()
        const parentLeft =
          tabRefs.current[0].parentElement.getBoundingClientRect().left
        setActiveTabWidth(width)
        setActiveTabLeft(left - parentLeft - 2)
      } else {
        alert('what')
        setActiveTab(null)
      }
    }

    const activeItem = items.find((item) => item.active)
    console.log('activeItem')
    console.log(activeItem)
    if (!activeItem) {
      setActiveTab(null)
    } else {
      setActiveTab(activeItem.text)
    }

    if (!isReady) {
      setIsReady(true)
      onReady?.()
    }
  }, [activeTab, items, isReady, onReady])

  const getTransition = (type) => {
    if (isFirstInteraction.current) {
      return { duration: 0 }
    }

    switch (type) {
      case 'position':
        return {
          type: 'spring',
          stiffness: 500,
          damping: 35,
        }
      case 'opacity':
        return {
          duration: 0.2,
          ease: 'easeInOut',
        }
      default:
        return {
          type: 'spring',
          stiffness: 500,
          damping: 35,
        }
    }
  }

  const renderTabItem = (item, index) => {
    const isActive = item.text === activeTab
    const commonClasses = `relative px-[14px] py-[10px] text-[16px] font-semibold font-host z-10 rounded-full whitespace-nowrap
      ${isActive && selectedTextColor ? `text-${selectedTextColor}` : ''}
      ${isActive && !selectedTextColor ? 'mix-blend-difference text-white' : ''}
      ${!isActive ? 'text-gray-700' : ''}
      ${selectedTextColor ? `text-${selectedTextColor}` : ''}
    `

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
        <AnimatePresence>
          {activeTab && (
            <motion.div
              className="absolute h-[calc(100%-4px)] top-[2px]"
              initial={{ opacity: 0, width: 0, x: activeTabLeft - 20 }}
              animate={{
                opacity: 1,
                x: activeTabLeft,
                width: activeTabWidth,
              }}
              exit={{
                opacity: 0,
                transition: getTransition('opacity'),
              }}
              transition={{
                opacity: { duration: 0.2, ease: 'easeInOut' },
                x: getTransition('position'),
                width: getTransition('position'),
              }}
            >
              <div
                className={`h-full w-full rounded-full bg-${selectedBgColor} `}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {items.map((item, index) => renderTabItem(item, index))}
      </div>
    </div>
  )
}

export default Tabs
