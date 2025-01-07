const ContactsPage = () => {
  return (
    <div
      className={`
      flex flex-col gap-y-[140px] mb-[140px]
      md:flex-row md:justify-between md:items-center md:mb-[80x] md:gap-y-[0px]
      pl-[30px] pr-[64px]
    `}
    >
      <ContactForm />
      <Address />
    </div>
  )
}

const ContactForm = () => (
  <div className="flex flex-col">
    <h1 className="text-4xl font-bold mb-12">
      Let's <span className="text-orange-500">talk</span> about
      <br />
      your project!
    </h1>

    <Input />
    <Input />
    <Input />
    <Input />

    <Button>send</Button>
  </div>
)

const Input = () => (
  <input
    type="text"
    placeholder="name"
    className="w-full p-4 bg-gray-50 rounded-xl outline-none"
  />
)

const Button = ({ children }) => (
  <button
    type="submit"
    className="w-full bg-black text-white py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
  >
    {children}
  </button>
)

const SocialButton = () => (
  <button className="flex-1 bg-black text-white p-4 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
    tg
  </button>
)

const Label = ({ children }) => (
  <h3 className="text-gray-500 mb-2">{children}</h3>
)

const Value = ({ children }) => <p className="text-xl">{children}</p>

const Address = () => (
  <div className="flex flex-col gap-y-[40px]">
    <div className="flex flex-col gap-y-[12px]">
      <Label>Call us</Label>
      <Value>Pärnu mnt 18, 10141 Tallinn, Estonia</Value>
    </div>
    <div className="flex flex-col gap-y-[12px]">
      <Label>Call us</Label>
      <Value>Pärnu mnt 18, 10141 Tallinn, Estonia</Value>
    </div>
    <div className="flex flex-col gap-y-[12px]">
      <Label>Call us</Label>
      <Value>Pärnu mnt 18, 10141 Tallinn, Estonia</Value>
    </div>
    <div className="flex gap-x-[30px]">
      <Button>schedule a call</Button>
      <div className="flex gap-x-[12px]">
        <SocialButton />
        <SocialButton />
      </div>
    </div>
  </div>
)

export default ContactsPage
