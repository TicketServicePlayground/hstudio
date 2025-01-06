import { SolutionCardData } from '@/types'

export const cards: SolutionCardData[] = [
  {
    bg: 'liliac',
    pic: './cover.png',
    title: 'Backend Solutions Development',
    card: {
      heading:
        'We specialize in building high-performance, scalable backend systems designed to handle heavy workloads and large-scale traffic.',
      benefits: [
        `Capacity: Processes up to 5 million messages per second, ensuring smooth operation during peak loads.`,
        `Big Data Handling: Efficiently manages billions of records.`,
      ],
      stack: [
        'Java / Kotlin',
        'Go',
        'Rust',
        'Docker',
        'Kubernetes',
        'ClickHouse',
      ],
    },
  },
  {
    bg: 'orange',
    pic: './cover-1.png',
    title: 'Web & Mobile Application Development',
    card: {
      heading:
        'Designed for optimal user experience, modern web and mobile applications combine intuitive interfaces with high performance',
      benefits: [
        'PWA & Responsive Design: App-like performance on all devices SSR with Next.js: Faster loads and better SEO API-first Development: Seamless system integration Real-time Features: Live chats, notifications, and updates via WebSockets and GraphQL.',
        'Big Data Handling: Efficiently manages billions of records.',
      ],
      stack: ['React', 'Next.js', 'Vue', 'TypeScript'],
    },
  },
  {
    bg: 'card',
    pic: './cover-2.png',
    title: 'Design & User Experience',
    card: {
      heading:
        'We create clean, intuitive designs that enhance user experience. From websites to apps, we focus on aesthetics, functionality, and accessibility for a seamless user journey.',
    },
  },
  {
    bg: 'blue',
    pic: './cover-3.png',
    title: 'DevOps & Automation',
    card: {
      heading:
        'Full-cycle DevOps services ensure automated deployment and streamlined development processes.',
      benefits: [
        'Automation & CI/CD: Streamlined deployment with continuous integration and delivery.',
        'Scalability & Security: Efficiently managing high-load systems with robust security practices throughout the deployment pipeline.',
        'Reliability: Continuous monitoring and quick recovery to minimize downtime',
      ],
      stack: ['Jenkins', 'Kubernetes', 'Docker', 'GitHub Actions'],
    },
  },
  {
    bg: 'lime',
    pic: './cover-4.png',
    title: 'Game & Web3 Platform Development',
    card: {
      heading:
        'Solutions for blockchain platforms and the gaming industry provide Web3 integration and real-time transactions, ensuring a decentralized experience',
      benefits: [
        'Web3 & Smart Contracts: Decentralized gaming with secure, automated transactions.',
        'Real-time Transactions: Instant blockchain-powered payments.',
        'Scalability & Security: Built for growth with strong security.',
      ],
      stack: ['Kotlin', 'Blockchain', 'TON', 'Web3'],
    },
  },
  {
    bg: 'cardDark',
    pic: './cover-5.png',
    title: 'Seamless Integration Across All Systems',
    card: {
      heading:
        'Ensuring efficient integration across any platform, service, or technology stack. From legacy systems to modern APIs, cloud services, and third-party tools, we cover all your business needs',
    },
  },
]
