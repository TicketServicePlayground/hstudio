'use client'
import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { clients } from '@/data/clients'

import Tabs from '@/components/tabs'
import Footer from '@/components/footer'

const ClientsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = [
    'All',
    'Backend Solutions',
    'Web & Mobile Application',
    'Design & User Experience',
    'DevOps & Automation',
    'Game & Web3',
    'Seamless Integration',
  ]

  return (
    <div className="flex flex-col w-full items-center pt-[196px] md:pt-[190px]">
      <Title>Examples of our expertise in action</Title>

      <div className="pl-[25px] md:pl-unset max-w-[100%] overflow-x-scroll">
        <Tabs
          selectedBgColor="blue"
          selectedTextColor="black"
          items={[
            'All',
            'Backend Solutions',
            'Web & Mobile Application',
            'Design & User Experience',
            'DevOps & Automation',
            'Game & Web3',
            'Seamless Integration',
          ].map((i) => ({
            text: i,
            onClick: () => {
              setActiveFilter(i)
            },
            type: 'button',
            active: activeFilter === i,
          }))}
        />
      </div>
      {/*
       */}

      <div
        className={`
        grid gap-[25px] md:gap-[20px]
        grid-cols-1 md:grid-cols-2
        mt-[80px] md:mt-[110px]

        mx-[25px] md:mx-[30px]
        mb-[140px] md:mb-[110px]
        w-[calc(100%-50px)] 
        md:w-[calc(100%-60px)] 
      `}
      >
        {clients.map((client) => (
          <ClientCard key={client.name} client={client} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

// <div className="grid grid-cols-2 w-full gap-2">
//   {clients.map((client) => (
//     <div key={client.name} className="aspect-square w-full">
//       <div
//         className={`w-full h-full rounded-[32px] overflow-hidden relative `}
//       >
//         {/* Card Content */}
//         <div className="absolute inset-0 p-6 flex flex-col">
//           {/* Logo */}
//           <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-climate mb-auto">
//             {client.logo}
//           </div>

//           {/* Bottom Content */}
//           <div>
//             <h3 className="text-2xl font-host mb-4">{client.name}</h3>
//             <div className="flex flex-wrap gap-2">
//               {client.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className={`px-4 py-1 rounded-full text-sm
//                     bg-${tag.bgColor} text-${tag.textColor}
//                   `}
//                 >
//                   {tag.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/*
//         <ProjectModal
//           logo={project.logo}
//           title={project.title}
//           description={project.description}
//           tags={project.tags}
//           backgroundImage={`/api/placeholder/800/800?text=${project.title}`}
//         />
// */}
//       </div>
//     </div>
//   ))}
// </div>

const ClientCard = ({ client }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-[20px] md:rounded-[32px] aspect-square w-full cursor-pointer min-h-[450px] md:min-h-unset"
      >
        <div className="w-full h-full rounded-[32px] overflow-hidden relative">
          {client.bgImg && (
            <img
              src={client.bgImg}
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
                <Dialog.Panel className="relative w-full max-w-3xl bg-white rounded-[32px] overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side - Image */}
                    <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto">
                      {client.contentImg ? (
                        <img
                          src={client.contentImg}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${client.bgImg ? 'bg-cover bg-center' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}
                          style={
                            client.bgImg
                              ? { backgroundImage: `url(${client.bgImg})` }
                              : {}
                          }
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-climate">
                        {client.logo}
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full md:w-1/2 p-8">
                      {/* Close Button */}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      >
                        <div>close</div>
                      </button>

                      {/* Content */}
                      <div className="space-y-6">
                        <Dialog.Title as="h2" className="text-3xl font-host">
                          {client.name}
                        </Dialog.Title>

                        <div>
                          <h3 className="text-lg mb-2">Technology Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {client.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-4 py-1 rounded-full text-sm bg-${tag.bgColor} text-${tag.textColor}`}
                              >
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-black/80">{client.bio}</p>

                        {client.stats && (
                          <div className="flex gap-12">
                            {client.stats.map((stat, index) => (
                              <div key={index}>
                                <div className="text-black/60 text-sm">
                                  {stat.label}:
                                </div>
                                <div>{stat.value}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {client.href && (
                          <a
                            href={client.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-black/80 transition-colors"
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
  <h2 className="font-host font-medium leading-[83%] text-[58px] md:text-[96px] text-center mb-[80px] md:mb-[60px]">
    Examples of our
    <br />
    expertise in action
  </h2>
)

// - cards
//     - bg
//     - logo
//     - name
//     - tag

// 	+ popup
//
//     - bg
//     - logo
//     - name
//     - tag
//
//     - image
//     - bio
//     - stats
//     - button

export default ClientsPage
