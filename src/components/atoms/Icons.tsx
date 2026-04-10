import angleDownIcon from '../../images/angle-down.svg'
import accountIcon from '../../images/account.svg'
import hamburgerIcon from '../../images/hamburger.svg'
import titleLogo from '../../images/horizontal-title.svg'

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={titleLogo}
      alt="Horizontal"
      width={112}
      height={80}
      className={className}
      decoding="async"
    />
  )
}

export function IconChevronDown({ className }: { className?: string }) {
  return <img src={angleDownIcon} alt="" className={className} width={12} height={12} aria-hidden />
}

export function IconAccount({ className }: { className?: string }) {
  return <img src={accountIcon} alt="" width={20} height={20} className={className} aria-hidden />
}

export function IconHamburger({ className }: { className?: string }) {
  return <img src={hamburgerIcon} alt="" width={24} height={24} className={className} aria-hidden />
}

export function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
