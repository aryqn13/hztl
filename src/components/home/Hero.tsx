import bannerImage from '../../images/banner.jpg'

export function Hero() {
  return (
    <section className="relative flex min-h-[500px] flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImage}
          alt="People collaborating on training"
          className="h-full w-full object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-brand-navy/60"></div>
      </div>

      <div className="relative z-10 container-desktop py-16 lg:py-24">
        <div className="max-w-2xl text-brand-pureWhite">
          <h1 className="mb-6">
            Horizontal Learning!
          </h1>
          <p className="intro mb-8 text-brand-surface">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text.
          </p>
          <a
            href="#"
            className="btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </section>
  )
}
