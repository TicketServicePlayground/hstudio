import {useEffect, useState} from "react";


export default function Cookie () {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
        if (!hasAcceptedCookies) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (

    <div
        className={`
              fixed bottom-[30px] left-[30px]
              bg-white cookies-container

              bottom-[50px] w-[calc(100vw-46px)] left-[23px]
              justify-between lg:justify-start


              lg:w-[330px] py-[20px] px-[20px]
              pr-[20px] lg:pr-[28px]
              gap-x-[14px]
              flex
            `}
    >
    <span className="font-host text-[14px] font-medium leading-none lg:w-[256px] w-[240px]">
      By continuing to use this site, you consent to the processing of
        {` `}
        <a
            href="google.com"
            target="_blank"
            className="text-orange hover:opacity-70"
        >
        cookies
      </a>
      .
    </span>
        <div className="p-[3px] cursor-pointer hover:opacity-60" onClick={()=> acceptCookies()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                className="w-[14px] h-[14px] mt-[3px]"
            >
                <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
                <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
                <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
                <path d="M1 15L15 1" stroke="black" strokeWidth={2} />
                <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
                <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
                <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
                <path d="M15 15L0.999999 1" stroke="black" strokeWidth={2} />
            </svg>
        </div>
    </div>
    )
}
