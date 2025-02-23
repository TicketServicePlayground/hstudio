import React from 'react'

const CookieBanner = () => {


  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:max-w-lg">
      <div className="bg-white rounded-[32px] p-4 shadow-sm flex items-center justify-between">
        <p className="text-sm pr-4">
          By continuing to use this site, you consent to the processing of{' '}
          <a href="#" className="text-orange hover:underline">
            cookies
          </a>
          .
        </p>
        <button className="flex-shrink-0">close</button>
      </div>
    </div>
  )
}

export default CookieBanner
