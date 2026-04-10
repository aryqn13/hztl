import certIcon from '../../images/certification-logo.svg'

const CERTS = Array(4).fill(0).map((_, i) => ({
  id: i,
  title: 'Certifications',
  icon: certIcon,
}))

export function FeaturedLearnings() {
  return (
    <section className="bg-brand-dark py-16 lg:py-24">
      <div className="container-desktop">
        <h2 className="mb-12 text-center text-brand-pureWhite">
          Featured Learnings
        </h2>
        
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full text-brand-pureWhite lg:w-[45%] lg:pt-4">
            <p className="mb-8 text-brand-surface/80">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including versions.
            </p>
            <a
              href="#"
              className="btn-primary"
            >
              Learn more
            </a>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-[55%]">
            {CERTS.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col items-center justify-center bg-white px-6 py-10 shadow-sm transition-transform hover:-translate-y-1"
              >
                <img src={cert.icon} alt="" className="mb-4 h-16 w-auto" />
                <h3 className="text-center">
                  {cert.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
