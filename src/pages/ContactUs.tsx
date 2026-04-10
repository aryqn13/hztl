import bannerImage from '../images/banner.jpg'

export function ContactUs() {
  return (
    <div className="flex w-full flex-col">
      {/* Contact Hero Area */}
      <section className="relative flex min-h-[300px] flex-col justify-center overflow-hidden bg-brand-navy lg:min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          
          <div className="absolute inset-0 bg-brand-teal/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-brand-navy/60"></div>
        </div>

        <div className="relative z-10 container-desktop pt-16">
          <h1 className="text-white">
            Contact us
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-desktop">
          <div className="max-w-2xl">
            <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>
            <h2 className="mb-6 text-brand-dark">
              Let's talk
            </h2>
            <p className="intro mb-12 text-brand-dark/80">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry,
              lorem Ipsum has been the industry's standard dummy.
            </p>

            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col border-b border-brand-dark">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col border-b border-brand-dark">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col border-b border-brand-dark">
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col border-b border-brand-dark">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                />
              </div>

              <div className="flex flex-col border-b border-brand-dark">
                <label className="sr-only">Department</label>
                <select className="w-full appearance-none bg-transparent pb-3 text-base font-semibold text-brand-dark outline-none">
                  <option value="" disabled selected>Department</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  required
                </select>
                
              </div>

              <div className="flex flex-col border-b border-brand-dark">
                <input
                  type="text"
                  placeholder="Role*"
                  className="w-full bg-transparent pb-3 text-base font-semibold text-brand-dark placeholder-brand-dark/70 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col p-0">
                <label className="sr-only">What would you like to talk about?</label>
                <div className="border-b border-brand-dark">
                  <select className="w-full appearance-none bg-transparent pb-3 text-base font-semibold text-brand-dark outline-none">
                    <option value="" disabled selected>What would you like to talk about?</option>
                    <option value="training">Training</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col">
                <textarea
                  placeholder="Your message"
                  rows={6}
                  className="w-full resize-none border border-brand-dark/30 p-4 text-base text-brand-dark placeholder-brand-dark/70 outline-none focus:border-brand-dark"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
