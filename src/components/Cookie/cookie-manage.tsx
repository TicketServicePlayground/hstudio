'use client'

import CookieModal from '@/components/Cookie/cookie-modal'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const CookieManage = () => {
  const [modal, setModal] = useState(false)
  const t = useTranslations('cookie')



  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="text-black hover:text-black/50 hover:underline text-[14px] font-host font-medium leading-none hover:no-underline"
      >
        {t('manage')}
      </button>
      <CookieModal
        isOpen={modal}
        onClose={() => {
          setModal(false)
        }}
      />
    </>
  )
}

export default CookieManage