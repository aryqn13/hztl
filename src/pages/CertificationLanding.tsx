import bannerImage from '../images/banner.jpg'
import frontendIcon from '../images/frontend-solution-logo.svg'
import backendIcon from '../images/backend-solution-logo.svg'
import devopsIcon from '../images/devops-solution-logo.svg'
import qaIcon from '../images/QA-solution-logo.svg'
import uiIcon from '../images/UI-solution-logo.svg'
import openIcon from '../images/open-solution-logo.svg'

const CATEGORIES = [
  { title: 'Frontend Certifications', icon: frontendIcon },
  { title: 'Backend Certifications', icon: backendIcon },
  { title: 'DevOps Certifications', icon: devopsIcon },
  { title: 'QA Certifications', icon: qaIcon },
  { title: 'UI Certifications', icon: uiIcon },
  { title: 'Other Certifications', icon: openIcon },
]

export function CertificationLanding() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="relative flex min-h-[250px] flex-col justify-center overflow-hidden lg:min-h-[350px]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-brand-navy/60"></div>
        </div>
        <div className="relative z-10 container-desktop py-16">
          <h1 className="text-white">Certification</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white py-4">
        <div className="container-desktop">
          <p className="text-sm text-brand-dark/60">
            <span>Home</span>
            <span className="mx-2">|</span>
            <span className="text-brand-dark">Certification</span>
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-desktop">
          <div className="max-w-3xl">
            <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>
            <h2 className="mb-6 text-brand-dark">Horizontal Certification</h2>
            <p className="text-base leading-relaxed text-brand-dark/80 md:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="bg-brand-surface py-16 lg:py-24">
        <div className="container-desktop">
          <h2 className="mb-4 text-center text-brand-dark">Certifications</h2>
          <p className="mx-auto mb-16 max-w-3xl text-center text-base text-brand-dark/80 md:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the,
            when an unknown printer took a galley.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center transition-transform hover:-translate-y-1"
              >
                <img src={cat.icon} alt="" className="mb-6 h-20 w-auto lg:h-24" />
                <h5 className="mb-4 text-center text-brand-dark">{cat.title}</h5>
                <div className="h-1.5 w-full bg-brand-teal"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
