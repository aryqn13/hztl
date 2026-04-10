import footerLogo from '../../images/footer-logo.svg'
import facebookIcon from '../../images/facebook.svg'
import instagramIcon from '../../images/instagram.svg'
import linkedinIcon from '../../images/linkedin.svg'
import twitterIcon from '../../images/twitter.svg'

export function Footer() {
  return (
    <footer className="bg-brand-dark py-12 text-white">
      <div className="container-desktop grid gap-8 lg:grid-cols-4">
        <div>
          <img
            src={footerLogo}
            alt="Horizontal"
            width={112}
            height={80}
            className="mb-6 h-12 w-auto"
          />
          {/* <p className="text-sm text-white/70">
            Empowering professionals with top-tier training and certification programs.
          </p> */}
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Training
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Certification
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Legal</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="transition-opacity hover:opacity-80">
              <img src={facebookIcon} alt="Facebook" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <img src={twitterIcon} alt="Twitter" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6 object-contain" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6 object-contain" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-desktop mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} Horizontal. All rights reserved.
      </div>
    </footer>
  )
}
