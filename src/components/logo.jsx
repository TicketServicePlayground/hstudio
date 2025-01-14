import Link from 'next/link'

const Logo = ({ className }) => (
  <div className={`hidden md:block font-climate ${className}`}>
    <Link href="/" className="text-[20px] cursor-pointer">
      H.STUDIO
    </Link>
  </div>
)

export default Logo
