'use client'
import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { clients, ClientT } from '@/data/clients'
import { useIsMobile } from '@/hooks'

import Tabs from '@/components/tabs'
import Footer from '@/components/footer'

const ClientsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')


  const categories = [
    {
      text: 'All',
      bgColor: 'black',
      textColor: 'white',
    },
    {
      text: 'Backend Solutions',
      bgColor: 'liliac',
      textColor: 'black',
    },
    {
      text: 'Web & Mobile Application',
      bgColor: 'orange',
      textColor: 'black',
    },
    {
      text: 'Design & User Experience',

      bgColor: '[#ECEBF1]',
      textColor: 'black',
    },
    {
      text: 'DevOps & Automation',
      bgColor: 'blue',
      textColor: 'black',
    },
    {
      text: 'Game & Web3',
      bgColor: 'orange',
      textColor: 'black',
    },
    {
      text: 'Seamless Integration',
      bgColor: 'cardDark', // or darkCard
      textColor: 'white',
    },
  ]

  const activeCategory = categories.find((i) => i.text === activeFilter)

  return (
    <div className="flex flex-col w-full items-center pt-[196px] md:pt-[190px]">
      <Title />

      <div className="pl-[25px] md:pl-unset max-w-[100%] overflow-x-auto">
        <Tabs
          // selectedBgColor="blue"
          // selectedTextColor="black"
          selectedBgColor={activeCategory?.bgColor || ''}
          selectedTextColor={activeCategory?.textColor || ''}
          need={false}
          items={categories.map((i) => ({
            text: i.text,
            onClick: () => {
              setActiveFilter(i.text)
            },
            type: 'button',
            active: activeFilter === i.text,
          }))}
        />
      </div>
      {/*
       */}

      <div
        className={`
        grid gap-[25px] lg:gap-[20px]
        grid-cols-1 md:grid-cols-2
        mt-[80px] md:mt-[110px]

        mx-[25px] md:mx-[30px]
        mb-[140px] md:mb-[110px]
        w-[calc(100%-50px)] 
        md:w-[calc(100%-60px)] 
      `}
      >

        {clients
          .filter(client => activeFilter === 'All' || client.categories.includes(activeFilter))
          .map(client => (
            <ClientCard key={client.name} client={client} />
          ))}
      </div>
      <Footer />
    </div>
  )
}

const ClientCard = ({ client }: {client: ClientT}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-[20px] md:rounded-[32px] aspect-square w-full cursor-pointer min-h-[450px] lg:min-h-[680px]"
      >
        <div className="w-full h-full rounded-[20px] lg:rounded-[32px] overflow-hidden relative">
          {client.bgImg && (
            <img
              src={
                isMobile && client.mobileBgImg
                  ? client.mobileBgImg
                  : client.bgImg
              }
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Card Content */}
          <div
            className={`
            absolute inset-0
            flex flex-col
            pl-[12px] pr-[12px] pb-[14px]
            md:pl-[40px] md:pr-[50px] md:pb-[48px]
            p-6
          `}
          >
            {/* Logo */}
            <img
              className="absolute top-0 left-0 w-[66px] h-[66px] md:w-[100px] md:h-[100px]"
              src={client.logo}
              alt={client.name + ' logo'}
            />

            {/* Bottom Content */}
            <div className="absolute left-[12px] bottom-[14px] md:left-[40px] md:bottom-[48px]">
              <h3 className="font-host font-medium text-[24px] md:text-[42px] leading-none mb-[30px]">
                {client.name}
              </h3>
              <div className="flex flex-wrap gap-[4px]">
                {client.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`font-space font-medium leading-none px-[12px] py-[8px] rounded-[9px] text-[12px] bg-${tag.bgColor} text-${tag.textColor}`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-[calc(100vw-1rem)] md:w-[calc(100vw-64px)] min-h-[calc(100vh-80px)] md:h-[calc(100vh-70px)] bg-white rounded-[20px] lg:rounded-[32px] mt-20 md:mt-0 overflow-auto mx-auto">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side - Image */}
                    <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
                      {client.contentImg ? (
                        <img
                          src={client.cardDesktop}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${client.bgImg ? 'bg-cover bg-center' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}
                          style={
                            client.bgImg
                              ? { backgroundImage: `url(${client.cardDesktop})` }
                              : {}
                          }
                        />
                      )}

                      <img
                        className="absolute top-0 left-0 w-[66px] h-[66px] md:w-[100px] md:h-[100px]"
                        src={client.logo}
                        alt={client.name + ' logo'}
                      />
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full md:w-1/2 p-8">
                      {/* Close Button */}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute hover:opacity-60 top-[21.8px] right-[21.8px] md:top-[28.8px] md:right-[28.8px]"
                      >
                        <X className="w-[22px] text-black" />
                      </button>

                      {/* Content */}
                      <div className="">
                        <Dialog.Title
                          as="h2"
                          className="font-host font-medium text-[24px] md:text-[42px] leading-none mb-[30px] md:mb-[40px]"
                        >
                          {client.name}
                        </Dialog.Title>

                        <div className="mb-[30px] md:mb-[40px]">
                          <h3 className="text-[14px] md:text-[18px] font-host font-bold mb-[16px]">
                            Technology Stack
                          </h3>
                          <div className="flex flex-wrap gap-[4px]">
                            {client.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`font-space font-medium leading-none px-[12px] py-[8px] rounded-[9px] text-[12px] bg-${tag.bgColor} text-${tag.textColor}`}
                              >
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="mb-[30px] md:mb-[40px] font-host font-medium leading-none text-[18px] md:text-[24px]">
                          {client.bio}
                        </p>

                        {client.stats && (
                          <div className="flex gap-[24px] mb-[30px] md:mb-[40px]">
                            {client.stats.map((stat, index) => (
                              <div key={index}>
                                <div className="font-host font-medium text-black text-[14px] mb-[6px] leading-none">
                                  {stat.label}:
                                </div>
                                <div className="text-[18px] font-host font-bold text-black leading-none">
                                  {stat.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {client.href && (
                          <a
                            href={client.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-[21px] px-[65.5px] font-host text-[20px] text-center font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
                          >
                            visit the website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const Title = () => (
  <h2 className="font-host font-medium leading-[83%] text-[58px] md:text-[96px] text-center mb-[80px] md:mb-[60px] mx-[20px] lg:mx-[0px]">
    Examples of&nbsp;our
    <br className="hidden lg:block" />
    <span className="inline-block lg:hidden w-[11px]" />
    expertise in&nbsp;action
  </h2>
)

export default ClientsPage
