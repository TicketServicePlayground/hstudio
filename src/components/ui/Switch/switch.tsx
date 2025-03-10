import React from 'react'

interface SwitchProps {
  value: boolean
  onClick: (newValue: boolean) => void
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={'button'}
      onClick={() => !disabled && onClick(!value)}
      className={`relative w-12 h-6 flex items-center rounded-full transition ${
        value ? 'bg-gray-300' : 'bg-gray-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <span
        className={`absolute left-1 w-5 h-5 bg-gray-200 rounded-full transition-transform ${
          value ? 'translate-x-6' : ''
        }`}
      />
    </button>
  )
}

export default Switch
