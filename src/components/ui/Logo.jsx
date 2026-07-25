import { LOGO, BRAND_NAME } from '../../constants/index'

export const Logo = ({ 
  size = 'md', 
  showText = true, 
  textColor = 'text-primary',
  className = '' 
}) => {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-label-md' },
    md: { icon: 'w-8 h-8', text: 'text-headline-md' },
    lg: { icon: 'w-10 h-10', text: 'text-headline-lg' },
    xl: { icon: 'w-12 h-12', text: 'text-display-lg' },
  }

  const currentSize = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={LOGO} 
        alt={BRAND_NAME}
        className={`${currentSize.icon} object-contain transition-transform duration-300 hover:scale-105`}
      />
      {showText && (
        <span className={`${currentSize.text} font-headline-md font-extrabold ${textColor} tracking-tight leading-none`}>
          {BRAND_NAME}
        </span>
      )}
    </div>
  )
}

export default Logo