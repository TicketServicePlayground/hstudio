import { SolutionCardData } from '@/types'

export const cards: SolutionCardData[] = [
  {
    bg: 'liliac',
    pic: './cover.png',
    backgroundImage: `url('/img/desktop-covers/cover.png') lightgray 108.299px -37.448px / 75.428% 110.699% no-repeat`,
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
    mobileTitleOffset: 400,
    innerBlockHeight: 700,
    blockHeightMobile: 1195
  },
  {
    bg: 'orange',
    pic: './cover-1.png',
    // background: url(<path-to-image>) lightgray 204.734px -43.244px / 61.452% 99.827% no-repeat;
    backgroundImage: './cover-1.png',
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
    mobileTitleOffset: 390,
    // innerBlockHeight: 649,
    innerBlockHeight: 700,
    blockHeightMobile: 1209
  },
  {
    bg: 'card',
    pic: './cover-2.png',
    // background: url(<path-to-image>) lightgray 62.841px -17.547px / 78.85% 107.772% no-repeat;
    backgroundImage: './cover-2.png',
    title: 'Design & User Experience',
    card: {
      heading:
        'We create clean, intuitive designs that enhance user experience. From websites to apps, we focus on aesthetics, functionality, and accessibility for a seamless user journey.',
    },
    mobileTitleOffset: 632,
    innerBlockHeight: 550,
    blockHeightMobile: 969
  },
  {
    bg: 'blue',
    pic: './cover-3.png',
    // background: url(<path-to-image>) lightgray 335.445px -152.007px / 54.734% 107.905% no-repeat;
    backgroundImage: './cover-3.png',
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
    mobileTitleOffset: 432,
    innerBlockHeight: 700,
    blockHeightMobile: 1231
  },
  {
    bg: 'lime',
    pic: './cover-4.png',
    // background: url(<path-to-image>) lightgray 79.31px -36.072px / 82.958% 126.712% no-repeat;
    backgroundImage: './cover-4.png',
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
    mobileTitleOffset: 390,
    innerBlockHeight: 700,
    blockHeightMobile: 1213
  },
  {
    bg: 'cardDark',
    pic: './cover-5.png',
    backgroundImage: './cover-5.png',
    // background: url(<path-to-image>) lightgray 335.164px -31.448px / 51.425% 108.985% no-repeat;
    title: 'Seamless Integration Across All Systems',
    card: {
      heading:
        'Ensuring efficient integration across any platform, service, or technology stack. From legacy systems to modern APIs, cloud services, and third-party tools, we cover all your business needs',
    },
    mobileTitleOffset: 348,
    innerBlockHeight: 530,
    blockHeightMobile: 1038
  },
]

// background: url(<path-to-image>) lightgray -91px 57.739px / 150.556% 60.222% no-repeat;

// background: url(<path-to-image>) lightgray -61.742px 45.429px / 141.317% 62.568% no-repeat;

// background: url(<path-to-image>) lightgray -18.452px 87.827px / 137.07% 51.062% no-repeat;

// background: url(<path-to-image>) lightgray -6.842px -12.943px / 121.001% 65.015% no-repeat;

// background: url(<path-to-image>) lightgray -10.462px 59.488px / 141.859% 59.056% no-repeat;

// background: url(<path-to-image>) lightgray -10.462px 59.488px / 141.859% 59.056% no-repeat;
