'use client'

import Footer from '@/components/footer'
import { ChangeEventHandler, FC, FocusEventHandler, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from '@formspree/react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

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

const ContactForm = () => {
  const [state, handleSubmit, reset] = useForm('xbldnrpn')
  
  const t = useTranslations('contacts')

  const form = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
      request: '',
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    if (state.succeeded) {
      toast.success('Sent')
      form.resetForm()
    }
  }, [state.succeeded])

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col px-[20px] lg:px-[65px] lg:py-[40px] py-[55px] bg-white rounded-[20px] lg:rounded-[60px] shadow-contact mr-[0px] lg:mr-[20px]"
    >
      <h1 className="text-[42px] lg:text-[64px] font-host leading-none font-medium mb-[40px]">
        {t.rich('title', {
          orange: (chunks) => <span className="text-orange">{chunks}</span>,
        })}
        <br className="block lg:block" />
        <span className="hidden lg:hidden w-[11px]" />
      </h1>

      <div className="flex flex-col gap-y-[10px] mb-[40px]">
        <Input
          type={'text'}
          id={'name'}
          name={'name'}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.name}
          placeholder={t('form.name')}
        />
        <Input
          type={'text'}
          id={'company'}
          name={'company'}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.company}
          placeholder={t('form.company')}
        />
        <Input
          type={'email'}
          id={'email'}
          name={'email'}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          placeholder={t('form.email')}
        />
        <Input
          type={'text'}
          id={'request'}
          name={'request'}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.request}
          placeholder={t('form.request')}
        />
      </div>

      <Button disabled={state.submitting}>{t('form.send')}</Button>
    </form>
  )
}

interface InputProps extends Partial<HTMLInputElement> {
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const Input: FC<InputProps> = (props) => {
  return (
    <input
      type={props.type || 'text'}
      id={props.id || ''}
      name={props.name || ''}
      placeholder={props.placeholder || ''}
      onChange={props.onChange}
      value={props.value}
      onBlur={props.onBlur}
      className="placeholder:text-black/40 text-black text-[16px] lg:text-[24px] rounded-[58px] p-[20px] bg-[#F6F5FA] focus:outline-liliac focus:outline-2"
    />
  )
}

const Button = ({
  children,
  disabled,
}: {
  children: ReactNode
  disabled: boolean
}) => (
  <button
    disabled={disabled}
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

const Label = ({ children }: { children: ReactNode }) => (
  <h3 className="font-bold font-host text-[18px] leading-none">{children}</h3>
)

const Value = ({ children }: { children: ReactNode }) => (
  <p className="font-medium font-host text-[24px] leading-none">{children}</p>
)

const Address = () => {
  const t = useTranslations('contacts.info')

  return (
    <div className="flex flex-col gap-y-[40px] max-w-[400px]">
      <div className="flex flex-col gap-y-[12px]">
        <Label>{t('address')}</Label>
        <Value>Pärnu mnt 18, 10141 Tallinn, Estonia</Value>
      </div>
      <div className="flex flex-col gap-y-[12px]">
        <Label>{t('callus')}</Label>
        <Link
          className="font-medium font-host text-[24px] leading-none"
          href={'tel:+4915754892281'}
        >
          +49 157 54892281
        </Link>
      </div>
      <div className="flex flex-col gap-y-[12px]">
        <Label>{t('hello')}</Label>
        <Link
          className="font-medium font-host text-[24px] leading-none"
          href={'mailto:Hello@h-studio.io'}
        >
          Hello@h-studio.io
        </Link>
      </div>
      <div className="flex flex-col items-center lg:flex-row gap-y-[30px] gap-x-[30px]">
        <Link
          href="https://calendly.com/hstudio"
          target="_blank"
          className="text-center block py-[21px] px-[72px] font-host text-[20px] whitespace-nowrap font-medium leading-none bg-black rounded-full text-white w-full lg:w-max"
        >
          {t('schedule')}
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
}

export default ContactsPage
