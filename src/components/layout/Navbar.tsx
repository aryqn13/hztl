import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navigationConfig from '../../config/navigation.json'
import { BrandLogo, IconAccount, IconHamburger, IconClose } from '../atoms/Icons'
import { logout } from '../../lib/auth'
import { NavItem } from '../molecules/NavItem'

export type NavbarNavId = 'home' | 'training' | 'certification' | 'contact'

export type NavbarProps = {
  isLoggedIn?: boolean
}

/**
 * ComponentFactory
 * Centralized registry/factory connecting our JSON types to React UI molecules.
 * This ensures the Navbar knows HOW to render JSON but not exactly WHAT each item does internally.
 */
const ComponentRegistry = {
  NavItem: NavItem,
}

export function Navbar({ isLoggedIn = true }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Determine active nav item from current route
  const getActiveItem = (): NavbarNavId => {
    const path = location.pathname
    if (path.startsWith('/training')) return 'training'
    if (path.startsWith('/certification')) return 'certification'
    if (path.startsWith('/contact')) return 'contact'
    return 'home'
  }
  const activeItem = getActiveItem()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const closeOnWide = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false)
    }
    window.addEventListener('resize', closeOnWide)
    return () => window.removeEventListener('resize', closeOnWide)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="relative z-50 bg-brand-dark text-white">
      <div className="container-desktop flex h-[88px] items-center gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
        <Link to="/" className="inline-flex shrink-0 items-center py-2">
          <BrandLogo className="h-12 w-auto lg:h-14" />
        </Link>

        <nav className="hidden justify-self-center lg:block" aria-label="Primary">
          <ul className="flex items-center gap-10">
            {navigationConfig.map((itemConfig) => {
              // Core Domain Rules applied generically
              if (itemConfig.authRequired && !isLoggedIn) return null

              const Component = ComponentRegistry[itemConfig.type as keyof typeof ComponentRegistry]
              if (!Component) return null

              return (
                <Component
                  key={itemConfig.id}
                  id={itemConfig.id}
                  label={itemConfig.label}
                  href={itemConfig.href}
                  hasDropdown={itemConfig.hasDropdown}
                  isActive={activeItem === itemConfig.id}
                />
              )
            })}
          </ul>
        </nav>

        {isLoggedIn ? (
          <div className="hidden items-center justify-self-end lg:flex">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded border border-white/35 px-4 py-2.5 text-base font-bold leading-7 text-white transition-colors hover:border-white/60 hover:bg-white/[0.06]"
            >
              <IconAccount className="shrink-0" />
              <span>My Account</span>
            </Link>
          </div>
        ) : (
          <div className="hidden items-center justify-self-end lg:flex">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-base font-bold leading-7 text-white transition-colors hover:text-white/85"
            >
              <IconAccount className="shrink-0" />
              <span>Log in</span>
            </Link>
          </div>
        )}

        <div className="ml-auto flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-white/35 p-2.5 hover:border-white/60"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <IconHamburger />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-brand-dark lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
            <Link to="/" className="inline-flex py-1">
              <BrandLogo className="h-11 w-auto" />
            </Link>
            <button
              type="button"
              className="inline-flex rounded p-2 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-5" aria-label="Primary mobile">
            <ul className="flex flex-col">
              {navigationConfig.map((itemConfig) => {
                if (itemConfig.authRequired && !isLoggedIn) return null

                const Component = ComponentRegistry[itemConfig.type as keyof typeof ComponentRegistry]
                if (!Component) return null

                return (
                  <Component
                    key={itemConfig.id}
                    id={itemConfig.id}
                    label={itemConfig.label}
                    href={itemConfig.href}
                    hasDropdown={itemConfig.hasDropdown}
                    isActive={activeItem === itemConfig.id}
                    isMobile={true}
                    onClick={() => setOpen(false)}
                  />
                )
              })}
            </ul>

            {isLoggedIn ? (
              <div className="mt-auto border-t border-white/15 pb-10 pt-8">
                <Link to="/profile" className="flex items-center gap-3 text-base font-bold text-white">
                  <IconAccount />
                  My Account
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setOpen(false) }}
                  className="mt-4 inline-block text-base font-normal text-white underline underline-offset-4 hover:text-white/80 transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="mt-auto border-t border-white/15 pb-10 pt-8">
                <Link to="/login" className="flex items-center gap-3 text-base font-bold text-white transition-colors hover:text-white/85">
                  <IconAccount />
                  Log in
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
