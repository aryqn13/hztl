export function CertificationsList() {
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-desktop">
        <h2 className="mb-4 text-center text-brand-dark">
          Certifications
        </h2>
        <p className="intro mx-auto mb-12 max-w-3xl text-center text-brand-dark/80">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the, when an unknown printer took a galley.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              className="flex min-h-[140px] items-center justify-center bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-center text-sm font-semibold leading-relaxed text-brand-dark">
                Lorem Ipsum is simply dummy text of the printing typesetting
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
