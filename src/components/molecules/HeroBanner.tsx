import bannerImage from '../../images/banner.jpg'

export type HeroBannerProps = {
  title: string
}

export function HeroBanner({ title }: HeroBannerProps) {
  return (
    <section className="relative flex min-h-[240px] flex-col justify-end overflow-hidden lg:min-h-[300px]">
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-brand-navy/60"></div>
      </div>

      <div className="relative z-10 container-desktop pb-10 lg:pb-14">
        <h1 className="text-white">{title}</h1>
      </div>
    </section>
  )
}
