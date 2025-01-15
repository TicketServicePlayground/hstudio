const LogoMarquee = () => {
  const logos = [
    { id: 3, alt: 'Societe', pic: 'societe.png' },
    { id: 4, alt: 'TON', pic: 'ton.png' },
    { id: 2, alt: 'Sber', pic: 'sber.png' },
    { id: 5, alt: 'QIWI', pic: 'qiwi.png' },
    { id: 1, alt: 'VTB', pic: 'vtb.png' },
  ]

  return (
    <div className="w-full overflow-hidden absolute top-[717px] lg:top-[841.78px]">
      <div className="relative flex items-center mx-[0px] lg:mx-[30px]">
        {/* Desktop static version */}
        <div className="hidden lg:flex w-full items-center justify-between">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center min-w-[150px]"
            >
              <img
                src={`/img/company-logos/${logo.pic}`}
                alt={logo.alt}
                className="w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile sliding version */}
        <div className="lg:hidden relative w-full overflow-hidden">
          <div className="flex gap-[50px] animate-marquee pl-[25px]">
            {/* First set of logos */}
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center min-w-[150px] shrink-0"
              >
                <img
                  src={`/img/company-logos/${logo.pic}`}
                  alt={logo.alt}
                  className="w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo) => (
              <div
                key={`${logo.id}-duplicate`}
                className="flex items-center justify-center min-w-[150px] shrink-0"
              >
                <img
                  src={`/img/company-logos/${logo.pic}`}
                  alt={logo.alt}
                  className="w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoMarquee
