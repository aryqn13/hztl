import { Link } from 'react-router-dom'
import footerLogo from '../../images/footer-logo.svg'
import facebookIcon from '../../images/facebook.svg'
import instagramIcon from '../../images/instagram.svg'
import linkedinIcon from '../../images/linkedin.svg'
import twitterIcon from '../../images/twitter.svg'

export function Footer() {
  return (
    <footer className="bg-brand-dark py-12 text-white">
      <div className="container-desktop flex flex-col gap-10 lg:flex-row lg:justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img
              src={footerLogo}
              alt="Horizontal"
              width={112}
              height={80}
              className="mb-6 h-12 w-auto lg:mb-0"
            />
          </Link>
        </div>

        {/* Nav links — right side on desktop */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-24">
          <div>
            <ul className="flex flex-row gap-6 text-sm font-bold text-white lg:flex-col lg:gap-3">
              <li>
                <Link to="/training" className="transition-colors hover:text-brand-teal">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/certification" className="transition-colors hover:text-brand-teal">
                  Certification
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-brand-teal">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <a href="#" className="transition-opacity hover:opacity-80" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" className="h-6 w-6 object-contain" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-desktop mt-12 border-t border-white/10 pt-8 text-sm text-white/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="hidden sm:inline sm:mx-3">|</span>
          <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          <span className="hidden sm:inline sm:mx-3">|</span>
          <span>&copy; Horizontal Digital {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
