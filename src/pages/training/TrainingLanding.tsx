import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/atoms/Breadcrumb'
import { HeroBanner } from '../../components/molecules/HeroBanner'
import { Text } from '../../components/atoms/Text'
import { Container } from '../../components/atoms/Container'
import trainingConfig from '../../config/training.json'

export function TrainingLanding() {
  const { categories } = trainingConfig

  return (
    <>
      {/* Hero */}
      <HeroBanner title="Training" />

      {/* Breadcrumb + Intro */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Training' },
          ]} />

          <div className="mt-10">
            <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>
            <Text as="h2" variant="h2" color="brand-dark" className="mb-6">
              Horizontal Training
            </Text>
            <p className="intro max-w-3xl text-brand-dark/80">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including versions.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Listing */}
      <section className="bg-brand-surface py-16 lg:py-24">
        <Container>
          <Text as="h2" variant="h2" color="brand-dark" align="center" className="mb-4">
            Category Listing
          </Text>

          <Text variant="intro" color="brand-dark" align="center" className="mx-auto mb-16 max-w-3xl opacity-80">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the, when an unknown printer took a galley.
          </Text>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/training/${cat.id}`}
                className="group flex flex-col items-center bg-transparent pt-10 transition-colors hover:bg-brand-teal"
              >
                <img
                  src={cat.iconPath}
                  alt=""
                  className="mb-6 h-[88px] w-auto transition-all group-hover:brightness-0 group-hover:invert"
                />
                <Text
                  as="h3"
                  variant="h3"
                  color="brand-dark"
                  align="center"
                  className="mb-6 transition-colors group-hover:text-white"
                >
                  {cat.title}
                </Text>
                <div className="h-2 w-full bg-brand-teal transition-colors group-hover:bg-[#70A29C]"></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
