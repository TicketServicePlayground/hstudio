import Footer from '@/components/footer'
import { ReactNode } from 'react'
import Link from 'next/link'

const ContactsPage = () => {
  return (
    <div className="flex flex-col relative w-full">
      <div
        className={`
          flex flex-col gap-x-[100px] xl:gap-x-[260px] gap-y-[140px] mb-[140px]
          lg:flex-row lg:justify-between lg:items-center lg:mb-[80x] lg:gap-y-[0px]
          lg:pl-[30px] lg:pr-[64px]
          pl-[25px] pr-[25px]
          pt-[100px] lg:pt-[120px]
        `}
      >
        <ContactForm />
        <Address />
      </div>
      <Footer />
    </div>
  )
}

const ContactForm = () => (
  <div
    className="flex flex-col px-[20px] lg:px-[65px] lg:py-[40px] py-[55px] bg-white rounded-[20px] lg:rounded-[60px] shadow-contact mr-[0px] lg:mr-[20px] 
  "
  >
    <h1 className="text-[42px] lg:text-[64px] font-host leading-none font-medium mb-[40px]">
      Let's <span className="text-orange">talk</span> about your project!
      <br className="block lg:block" />
      <span className="hidden lg:hidden w-[11px]" />

    </h1>

    <div className="flex flex-col gap-y-[10px] mb-[40px]">
      <Input placeholder="name" />
      <Input placeholder="company" />
      <Input placeholder="email" />
      <Input placeholder="describe your request" />
    </div>

    <Button>send</Button>
  </div>
)

const Input = ({ placeholder }: {placeholder: string}) => (
  <input
    type="text"
    placeholder={placeholder}
    className="placeholder:text-black/40 text-black text-[16px] lg:text-[24px] rounded-[58px] p-[20px] bg-[#F6F5FA] focus:outline-liliac focus:outline-2"
  />
)

const Button = ({ children }: {children: ReactNode}) => (
  <button
    type="submit"
    className="py-[21px] px-[117.5px] font-host text-[20px] font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
  >
    {children}
  </button>
)

const SocialButton = () => (
  <button className="flex-1 bg-black text-white p-4 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
    tg
  </button>
)

const Label = ({ children }: {children: ReactNode}) => (
  <h3 className="font-bold font-host text-[18px] leading-none">{children}</h3>
)

const Value = ({ children }: {children: ReactNode}) => (
  <p className="font-medium font-host text-[24px] leading-none">{children}</p>
)

const Address = () => (
    <div className="flex flex-col gap-y-[40px] max-w-[400px]">
        <div className="flex flex-col gap-y-[12px]">
            <Label>Correspondence Address</Label>
            <Value>Pärnu mnt 18, 10141 Tallinn, Estonia</Value>
        </div>
        <div className="flex flex-col gap-y-[12px]">
            <Label>Call us</Label>
            <Value>+49 157 54892281</Value>
        </div>
        <div className="flex flex-col gap-y-[12px]">
            <Label>Say Hello</Label>
            <Value>hello@h2.studio</Value>
        </div>
        <div className="flex flex-col items-center lg:flex-row gap-y-[30px] gap-x-[30px]">
            <Link
                href="https://calendly.com/hstudio"
                target="_blank"
                className="block py-[21px] px-[72px] font-host text-[20px] whitespace-nowrap font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
            >
                schedule a call
            </Link>
            <div className="flex gap-x-[12px]">
                <Link
                    href="https://wa.me/+4915754892281"
                    target="_blank"
                    className="bg-black rounded-[13.333px] w-[48px] h-[48px] p-[10.67px] cursor-pointer hover:bg-black/80"
                >
                    <img
                        src="/img/social/whatsapp.svg"
                        alt="X.com logo"
                        className="w-[26.667px] h-[26.667px]"
                    />
                </Link>
                <Link
                    href="https://t.me/+4915754892281"
                    target="_blank"
                    className="bg-black rounded-[13.333px] w-[48px] h-[48px] p-[10.67px] cursor-pointer hover:bg-black/80"
                >
                    <img
                        src="/img/social/telegram.svg"
                        alt="Instagram logo"
                        className="w-[26.667px] h-[26.667px]"
                    />
                </Link>
            </div>
        </div>
    </div>
)

export default ContactsPage
