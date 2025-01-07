'use client'
import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

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
    <div className="flex flex-col items-center">
      <Title>Examples of our expertise in action</Title>

      <div className="overflow-x-auto mb-12">
        <div className="flex gap-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
                ${
                  activeFilter === category
                    ? 'bg-blue text-black'
                    : 'hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/*
      <Tabs
        items={[
          'All',
          'Backend Solutions',
          'Web & Mobile Application',
          'Design & User Experience',
          'DevOps & Automation',
          'Game & Web3',
          'Seamless Integration',
        ]}
      />
      */}
      <div className="grid grid-cols-2 w-full gap-2">
        {clients.map((client) => (
          <ClientCard key={client.name} client={client} />
        ))}
      </div>
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
        className="aspect-square w-full cursor-pointer"
      >
        <div className="w-full h-full rounded-[32px] overflow-hidden relative">
          {/* Background Image */}
          {client.bgImg && (
            <img
              src={client.bgImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Card Content */}
          <div className="absolute inset-0 p-6 flex flex-col">
            {/* Logo */}
            <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-climate mb-auto">
              {client.logo}
            </div>

            {/* Bottom Content */}
            <div>
              <h3 className="text-2xl font-host mb-4">{client.name}</h3>
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
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-host text-center mb-16">
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

const clients = [
  {
    logo: '',
    name: 'EventStripe',
    bgImg: '',
    contentImg: '',
    tags: [
      {
        text: 'Web & Mobile Application',
        bgColor: 'orange',
        textColor: 'black',
      },
      {
        text: 'DevOps & Automation',
        bgColor: 'blue',
        textColor: 'black',
      },
    ],
    bio: 'The company developed a SaaS platform, EventStripe, designed for ticket sales at events, supporting high burst loads of up to 10,000 sessions. The project leverages modern technologies such as Next.js, Java 20, Spring, Docker, Kubernetes, and monitoring tools like Jenkins, ELK, and Grafana. The primary focus was to ensure system stability under high loads and provide scalability flexibility.',
    stats: [
      {
        label: 'Team Size',
        value: '3 people',
      },
      {
        label: 'Duration',
        value: '12 months',
      },
    ],
    href: 'https://google.com', // defines whethere there's cta
  },
  {
    logo: '',
    name: 'VTB — Data Streaming System',
    bgImg: '',
    tags: [
      {
        text: 'Backend Solutions',
        bgColor: 'liliac',
        textColor: 'black',
      },
      {
        text: 'DevOps & Automation',
        bgColor: 'blue',
        textColor: 'black',
      },
    ],
    bio: 'A real-time data streaming system was developed for VTB Bank, capable of processing millions of messages per second. The project utilizes a tech stack based on Java 17, Spring, Kafka, PostgreSQL, as well as containerization and orchestration through Docker and Kubernetes. The solution enables real-time processing of vast amounts of data and ensures high performance for financial sector tasks.',
    stats: [
      {
        label: 'Team Size',
        value: '5 people',
      },
      {
        label: 'Duration',
        value: '9 months',
      },
    ],
  },
  {
    logo: '',
    name: 'Sber — Microservice Architecture and Biometric Authorization',
    bgImg: '',
    tags: [
      {
        text: 'Web & Mobile Application',
        bgColor: 'orange',
        textColor: 'black',
      },
      {
        text: 'DevOps & Automation',
        bgColor: 'blue',
        textColor: 'black',
      },
      {
        text: 'Seamless Integration',
        bgColor: 'graphite', // or darkCard
        textColor: 'white',
      },
    ],
    bio: 'A microservice architecture, including a biometric authorization system, was designed and implemented for Sber. The solution covers key client functions such as document generation, session tracking, and asynchronous integration with data spaces and other systems. The project is built using Spring, Java 17, Oracle, Docker, and Kubernetes for container management and scalability.',
    stats: [
      {
        label: 'Team Size',
        value: '5 people',
      },
      {
        label: 'Duration',
        value: '18 months',
      },
    ],
  },
  {
    logo: '',
    name: 'Societe Generale — Personalized Advertising Banner Service',
    bgImg: '',
    contentImg: '',
    tags: [
      {
        text: 'Web & Mobile Application',
        bgColor: 'orange',
        textColor: 'black',
      },
      {
        text: 'DevOps & Automation',
        bgColor: 'blue',
        textColor: 'black',
      },
      {
        text: 'Seamless Integration',
        bgColor: 'graphite', // or darkCard
        textColor: 'white',
      },
    ],
    bio: 'A personalized advertising system for credit products was developed for Societe Generale Bank. The system includes a banner service, credit conveyor, and API for integration with external systems. The core technologies used include Java 11, Spring, Oracle, Docker, Kubernetes, and Jenkins for CI/CD processes. The project aims to improve customer engagement and automate credit operations.',
    stats: [
      {
        label: 'Team Size',
        value: '5 people',
      },
      {
        label: 'Duration',
        value: '12 months',
      },
    ],
  },
  {
    logo: '',
    name: 'Architectural bureau MIR',
    bgImg: '',
    contentImg: '',
    tags: [
      {
        text: 'Design & User Experience',
        bgColor: 'gray',
        textColor: 'black',
      },
    ],
    bio: 'UX/UI website design for an architectural bureau. MIR globally transforms space and influences the cultural code, forming a new world.',
    stats: [
      {
        label: 'Team Size',
        value: '3 people',
      },
      {
        label: 'Duration',
        value: '6 months',
      },
    ],
    href: 'https://google.com',
  },
  {
    logo: '',
    name: 'KClub Group',
    bgImg: '',
    contentImg: '',
    tags: [
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
    ],
    bio: 'A company in the leisure and tourism sector, for which we created a website with booking functionalities. The design was provided by the client, and we used Java for the backend logic and Next.js for the frontend, allowing us to create a fast and user-friendly service with excellent performance.',
    href: 'https://google.com',
  },
  {
    logo: '',
    name: 'Matahari Hills',
    bgImg: '',
    contentImg: '',
    tags: [
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
        text: 'Seamless Integration',
        bgColor: 'graphite', // or darkCard
        textColor: 'white',
      },
    ],
    bio: 'A project for an upscale residential complex with integrated interactive maps and multimedia content. The design was provided by the client, and we used Kotlin and Rust for backend reliability and security, while the dynamic interface was created with React and Vue.js.',
    href: 'https://google.com',
  },
  {
    logo: '',
    name: 'Mirage Flash',
    bgImg: '',
    contentImg: '',
    tags: [
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
        bgColor: 'gray',
        textColor: 'black',
      },
    ],
    bio: 'A project for creating unique dynamic websites that combine creative design with cutting-edge technology. The design was provided by the client, and we used Java/Kotlin and Go for the backend, and React for the frontend, ensuring a high level of user interaction and fast data processing.',
    href: 'https://google.com',
  },
  {
    logo: '',
    name: 'Frigate Surfboards',
    bgImg: '',
    contentImg: '',
    tags: [
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
        text: 'DevOps & Automation',
        bgColor: 'blue',
        textColor: 'black',
      },
      {
        text: 'Seamless Integration',
        bgColor: 'graphite', // or darkCard
        textColor: 'white',
      },
    ],
    bio: 'Development of an e-commerce site for a surfboard manufacturer, focusing on fast page load times and an intuitive user interface. The design was provided by the client, and the backend was built with Go and Rust, while the frontend was developed with Vue and TypeScript. We also implemented solutions for scalability and process automation.',
    href: 'https://google.com',
  },
  {
    logo: '',
    name: 'Ntainers',
    bgImg: '',
    contentImg: '',
    tags: [
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
        text: 'Seamless Integration',
        bgColor: 'graphite', // or darkCard
        textColor: 'white',
      },
    ],
    bio: 'An Australia StartUp project designed to manage and streamline container logistics. The design was provided by the client, and the backend was built with Go for performance and scalability. The frontend was developed using React for a seamless user experience, ensuring efficient management and tracking of containers.',
    href: 'https://google.com',
  },
]

export default ClientsPage
