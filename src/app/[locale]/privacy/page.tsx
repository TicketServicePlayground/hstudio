import React from 'react'
import Footer from "@/components/footer";

const PrivacyPage = () => {
    return (
        <main className={'font-space'}>
            <div className="flex flex-col lg:px-36 md:px-20 px-5 mt-36">
                <h1 className={"font-host font-medium leading-[83%] text-[48px] md:text-[96px] md:text-left text-center"}>
                    Privacy Policy
                </h1>
                <span className={'mb-[60px] md:mb-[80px] md:text-base text-sm mt-6 text-center md:text-left'}>Last updated: February 18, 2025</span>

                <p className={'mb-12 md:text-xl'}>
                    This Privacy Policy (“Policy”) explains how H-Studio (“H-Studio,” “we,” “us,” or “our”) collects,
                    protects, and uses personally identifiable information (“Personal Information”) that you (“User,”
                    “you,” or “your”) may provide when using our website h-studio.io (the “Website”) or in the course of
                    purchasing our services. This Policy also describes your rights regarding your Personal Information
                    and how you can manage it.
                    <br/><br/>
                    This Policy does not apply to third-party services that we do not own or control.

                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>1. Collection of Personal Information</h2>
                <p className={'mb-12 md:text-xl'}>
                    We collect and store Personal Information that you knowingly provide to us, including: <br/><br/>
                    • Your email address (required for communication and service access). <br/>
                    • Additional details you voluntarily provide when contacting us. <br/>
                    <br/>
                    We do not collect sensitive personal data, such as payment details—our payment processor handles
                    transactions securely.

                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>2. Collection of Non-Personal Information</h2>
                <p className={'mb-12 md:text-xl'}>
                    When you visit our Website, our servers automatically log certain non-personal data, such as:<br/>
                    <br/>
                    • Your <span className={'font-bold'}>IP address</span>, browser type, and operating system. <br/>
                    • Referring website, pages visited, and time spent on each page. <br/>
                    • General usage statistics to improve our services. <br/>
                    <br/>
                    This information is used for analytics and security monitoring.

                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>3. Payments & Third-Party Services</h2>
                <p className={'mb-12 md:text-xl'}>All transactions on the Website are processed<span
                    className={'font-bold'}> by third-party payment
                    providers</span>. Payment processors may collect and store additional personal information
                    (such as your name, billing address, and credit card details) according to their own policies.
                    H-Studio <span className={'font-bold'}>does not store or process</span> payment details.</p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>4. Managing Your Personal Information</h2>
                <p className={'mb-12 md:text-xl'}>You can:<br/><br/>
                    • Request <span className={'font-bold'}> updates or corrections </span> to your Personal
                    Information.<br/>
                    • Request <span className={'font-bold'}>deletion</span> of your Personal Information (note: this may
                    prevent access to purchased services). <br/>
                    <br/>
                    To make any requests, email us at <a href="mailto:hello@h-studio.io"><span
                        className={'font-bold'}>hello@h-studio.io</span></a>.<br/>
                    <br/>
                    We retain data for as long as necessary to fulfill business and legal obligations. Once the
                    retention period expires, Personal Information is permanently deleted.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>5. Use and Processing of Collected Information</h2>
                <p className={'mb-12 md:text-xl'}>We use collected data to: <br/><br/>
                    • Provide and improve our services.<br/>
                    • Communicate with you regarding transactions or inquiries.<br/>
                    • Ensure website security and prevent fraud.<br/>
                    • Comply with legal requirements.<br/>
                    <br/>
                    We will <span className={'font-bold'}>never sell or rent</span> your Personal Information to third
                    parties.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>6. International Data Transfers</h2>
                <p className={'mb-12 md:text-xl'}>Your data may be stored or processed in a country different from your
                    own. If we transfer your data internationally, we take appropriate security measures to ensure
                    compliance with applicable data protection laws.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>7. Your Rights</h2>
                <p className={'mb-12 md:text-xl'}>You have the right to: <br/><br/>
                    • Withdraw consent for data processing.<br/>
                    • Request access to your Personal Information.<br/>
                    • Request corrections or updates.<br/>
                    • Request data deletion under certain conditions.<br/>
                    • Object to data processing for direct marketing purposes.<br/>
                    <br/>
                    To exercise these rights, contact us at <a href="mailto:hello@h-studio.io"><span
                        className={'font-bold hover:text-black/50'}>hello@h-studio.io</span></a>.

                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>8. Privacy of Children</h2>
                <p className={'mb-12 md:text-xl'}>We do not knowingly collect data from children under <span
                    className={'font-bold'}> 13 years old</span>. If you believe a child has provided us with Personal
                    Information, please contact us immediately.
                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>9. Cookies and Tracking Technologies</h2>
                <p className={'mb-12 md:text-xl'}>We use <span
                    className={'font-bold'}>cookies</span> to enhance user experience and collect website usage
                    statistics. You can disable cookies in your browser settings, but some features of the Website may
                    not function properly.
                </p>
                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>10. Security Measures</h2>
                <p className={'mb-12 md:text-xl'}>We implement <span className={'font-bold'}>technical and organizational security measures</span> to
                    protect your data. However, no online platform is completely secure. You acknowledge that:<br/><br/>
                    • Internet data transmission is not 100% secure. <br/>
                    • We cannot guarantee absolute protection against cyberattacks. <br/>
                    <br/>
                    If we detect a <span className={'font-bold'}>data breach</span>, we will notify affected users and
                    take necessary legal steps.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>11. Third-Party Links</h2>
                <p className={'mb-12 md:text-xl'}>Our Website may contain links to external websites. We are <span
                    className={'font-bold'}>not responsible</span> for their privacy practices. We encourage you to review their policies separately.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>12. Changes to This Policy</h2>
                <p className={'mb-12 md:text-xl'}>We may update this Policy from time to time. Any changes will be posted on this page with a <span
                    className={'font-bold'}>revised date</span>. Continued use of our Website means you accept the updated Policy.
                </p>

                <h2 className={'font-host mb-3 text-[20px] md:text-[40px] font-bold'}>13. Contact Us</h2>
                <p className={'mb-12 md:text-xl'}>
                    If you have any questions about these Terms, you can contact us at:
                    <br/>
                    <br/>
                    <span className={'font-bold hover:text-black/50'}>📍 Correspondence Address:</span><br/>
                    Pärnu mnt 18, 10141 Tallinn, Estonia<br/> <br/>
                    <span className={'font-bold'}>📞 Call us: </span> <a href="tel:+49 157 54892281" className={'hover:text-black/50'}>+49 157 54892281</a><br/>
                    <br/>
                    <span className={'font-bold'}>✉ Email: </span> <a href="mailto:hello@h-studio.io" className={'hover:text-black/50'}>hello@h-studio.io</a>
                </p>

            </div>
            <section className="snap-start">
                <Footer/>
            </section>
        </main>
    )
}


export default PrivacyPage
