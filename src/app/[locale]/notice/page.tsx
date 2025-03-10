import Footer from '@/components/footer'

export default function NoticePage() {
  return (
    <main className="flex flex-col w-full items-center pt-[196px] md:pt-[190px]">
      <div className={'mb-[140px] lg:mb-[80x] px-10 md:px-0'}>
        <p>Company Name: [Your Company Name]</p>
        <p>Address: [Street Address], [Postal Code] [City], [Country]</p>
        <p>Phone: [Phone Number]</p>
        <p>Email: [Email Address]</p>
        <p>Represented by: [Name of the Authorized Representative]</p>
        <p>Company Registration Number: [Registration Number]</p>
        <p>VAT Identification Number: [VAT Number]</p>
        <p>Register Court: [Name of the Register Court]</p>
      </div>
      <Footer />
    </main>
  )
}
