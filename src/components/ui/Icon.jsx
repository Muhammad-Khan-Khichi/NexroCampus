import * as LucideIcons from 'lucide-react'

export const Icon = ({ 
  name, 
  size = 24, 
  strokeWidth = 2,
  filled = false,
  className = '',
  style = {}
}) => {
  // Convert kebab-case or snake_case to PascalCase for Lucide
  const pascalCase = name
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
  
  const IconComponent = LucideIcons[pascalCase] || LucideIcons.Circle

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      fill={filled ? 'currentColor' : 'none'}
      className={className}
      style={style}
    />
  )
}

export default Icon