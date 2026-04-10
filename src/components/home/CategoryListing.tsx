
import categoryConfig from '../../config/categories.json'
import { Text } from '../atoms/Text'
import { Container } from '../atoms/Container'
import { Card } from '../molecules/Card'

// A small Component Registry just for demonstration in this organism
const Registry = {
  Card: Card,
}

export function CategoryListing() {
  const { section, cards } = categoryConfig

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <Text as="h2" variant="h2" color="brand-dark" align="center" className="mb-4">
          {section.title}
        </Text>
        
        <Text variant="intro" color="brand-dark" align="center" className="mx-auto mb-16 max-w-3xl opacity-80">
          {section.intro}
        </Text>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((cardData) => {
            const Component = Registry[cardData.type as keyof typeof Registry]
            if (!Component) return null

            return (
              <Component
                key={cardData.id}
                title={cardData.title}
                // Vite handles absolute root paths mapped gracefully with /src
                icon={cardData.iconPath} 
                className="bg-white pt-10"
              >
                {cardData.bottomBarColor && (
                  <div className={`h-2 w-full bg-${cardData.bottomBarColor} transition-colors group-hover:bg-[#70A29C]`}></div>
                )}
              </Component>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
