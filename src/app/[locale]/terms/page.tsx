import React from 'react'
import Footer from "@/components/footer";

const TermsPage = () => {
    return (
        <main className={'font-space'}>
            <div className="flex flex-col lg:px-36 md:px-20 px-5 mt-36">
                <h1 className={"font-host font-medium leading-[83%] text-[48px] md:text-[96px] md:text-left text-center"}>
                    Terms of Service
                </h1>
                <span className={'mb-[60px] md:mb-[80px] md:text-base text-sm mt-6 text-center md:text-left'}>Last updated: February 18, 2025</span>

                <p className={'mb-12 md:text-xl'}>
                    This Terms of Service Agreement (“Agreement”) constitutes a legally binding agreement between
                    H-Studio (“Company,” “we,” “us,” or “our”) and the client (“Client,” “you,” or “your”) regarding the
                    access and use of our website: h-studio.io (the “Website”) and any related media, applications, or
                    services. By using the Website, you agree to comply with these Terms of Service. If you do not
                    agree, you must discontinue use immediately.
                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>1. Intellectual Property Rights</h2>
                <p className={'mb-12 md:text-xl'}>Unless otherwise stated, H-Studio owns all rights to the Website,
                    including
                    source code, databases,
                    software, designs, audio, video, text, and graphics (collectively, “Content”) and trademarks,
                    service marks, and logos (“Marks”). The Content and Marks are provided “As-Is” for personal use
                    only. You may not copy, reproduce, modify, sell, or distribute any part of the Website without prior
                    written consent from H-Studio.</p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>Ownership of Client Work:</h2>
                <p className={'mb-12 md:text-xl'}>All design work and original source files created for the Client
                    (“Projects”)
                    belong to the Client, who retains full copyright ownership. H-Studio does not claim any rights to
                    the completed Projects. However, if Client provides materials to be used in the Project, they
                    confirm that they own or have legal permission to use such materials.</p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>2. Payment and Transactions</h2>
                <p className={'mb-12 md:text-xl'}>H-Studio operates on a non-cash payment basis. Payments must be made via
                    bank
                    transfer to our company account. Full details on pricing, billing, and accepted payment methods will
                    be outlined in individual agreements between H-Studio and the Client.</p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>3. Returns and Refunds</h2>
                <p className={'mb-12 md:text-xl'}>Refund requests are assessed on a case-by-case basis. Payments for
                    completed work
                    are generally non-refundable. If a refund is approved, a processing fee of 25% will apply to the
                    remaining billable amount. Any materials created by H-Studio before a refund request remain the
                    property of H-Studio and cannot be used by the Client.</p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>4. Client Responsibilities and Prohibited Activities</h2>
                <p className={'mb-12 md:text-xl'}>Clients agree to: <br/><br/>
                    • Provide accurate information and maintain legal capacity to enter into agreements.<br/>
                    • Not use the Website for illegal or unauthorized purposes.<br/>
                    • Not engage in fraud, harassment, or any activity that disrupts H-Studio’s operations.<br/>
                    • Not reverse-engineer, copy, or modify the Website’s code.<br/>
                    • Not upload malicious software or violate intellectual property laws.<br/><br/>

                    Any violation of these terms may result in termination of services and legal action.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>5. Privacy Policy</h2>
                <p className={'mb-12 md:text-xl'}>By using the Website, you agree to our Privacy Policy, which governs how
                    we
                    collect, use, and protect your data. The Website is hosted in Estonia, and accessing it from other
                    regions may be subject to different laws.
                    <br/><br/>
                    H-Studio does not knowingly collect information from users under 18 years old. If we become aware of
                    any such data, it will be deleted immediately.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>6. Showcasing Client Work</h2>
                <p className={'mb-12 md:text-xl'}>H-Studio reserves the right to showcase completed client work on our
                    website and social media. If a Client wishes to keep their project private, they must explicitly
                    request a <span className={'font-bold'}>Non-Disclosure Agreement (NDA)</span>, which will override
                    this clause.
                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>7. Limitation of Liability</h2>
                <p className={'mb-12 md:text-xl'}>H-Studio is not liable for:
                    <br/><br/>
                    • Any direct, indirect, incidental, or consequential damages resulting from your use of our
                    services.<br/>
                    • Any delays or interruptions due to external factors beyond our control.<br/>
                    • Any disputes arising from third-party software, fonts, or materials used in a Project.<br/>
                    <br/>

                    Clients assume full responsibility for their use of our services.

                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>8. Governing Law & Disputes</h2>
                <p className={'mb-12 md:text-xl'}>These Terms are governed by the laws of <span
                    className={'font-bold'}> Estonia</span> (or the United States, subject to final company
                    registration). Any legal disputes shall be resolved through arbitration or in a court within the
                    applicable jurisdiction.
                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>9. Modifications to Terms</h2>
                <p className={'mb-12 md:text-xl'}>By using the Website, you agree to our Privacy Policy, which governs how
                    we
                    H-Studio reserves the right to modify these Terms at any time. Continued use of our services after
                    changes are posted constitutes your acceptance of the updated Terms.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>10. Contact Information</h2>
                <p className={'mb-12 md:text-xl'}>
                    If you have any questions about these Terms, you can contact us at:
                    <br/>
                    <br/>
                    <span className={'font-bold hover:text-black/50'} >📍 Correspondence Address:</span><br/>
                    Pärnu mnt 18, 10141 Tallinn, Estonia<br/> <br/>
                    <span className={'font-bold hover:text-black/50'}>📞 Call us: </span> <a href="tel:+49 157 54892281">+49 157 54892281</a><br/> <br/>
                    <span className={'font-bold hover:text-black/50'}>✉ Email: </span> <a href="mailto:hello@h-studio.io">hello@h-studio.io</a>
                </p>

            </div>
            <section className="snap-start">
                <Footer/>
            </section>
        </main>
    )
}


export default TermsPage
