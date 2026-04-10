import { Hero } from '../components/home/Hero'
import { Welcome } from '../components/home/Welcome'
import { ExploreBy } from '../components/home/ExploreBy'
import { FeaturedLearnings } from '../components/home/FeaturedLearnings'
import { CategoryListing } from '../components/home/CategoryListing'
import { CertificationsList } from '../components/home/CertificationsList'

export function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <ExploreBy />
      <FeaturedLearnings />
      <CategoryListing />
      <CertificationsList />
    </>
  )
}
