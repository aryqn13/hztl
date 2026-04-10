import subscriptionIcon from '../../images/learning-subscription-logo.svg'
import solutionsIcon from '../../images/learning-solution-logo.svg'
import certIcon from '../../images/certification-logo.svg'

const CARDS = [
  { title: 'Learning Subscriptions', icon: subscriptionIcon },
  { title: 'Learning Solutions', icon: solutionsIcon },
  { title: 'Certifications', icon: certIcon },
]

export function ExploreBy() {
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-desktop">
        <h2 className="mb-12 text-center text-brand-dark">
          Explore by
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center bg-brand-surface px-8 py-12 transition-colors hover:bg-brand-teal"
            >
              <img src={card.icon} alt="" className="mb-6 h-20 w-auto transition-all group-hover:brightness-0 group-hover:invert" />
              <h3 className="text-center text-brand-dark transition-colors group-hover:text-white">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
