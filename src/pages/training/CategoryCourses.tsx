import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Breadcrumb } from '../../components/atoms/Breadcrumb'
import { HeroBanner } from '../../components/molecules/HeroBanner'
import { Text } from '../../components/atoms/Text'
import { Container } from '../../components/atoms/Container'
import trainingConfig from '../../config/training.json'

const ITEMS_PER_PAGE = 7

export function CategoryCourses() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTag, setActiveTag] = useState('All')

  // Look up category
  const category = trainingConfig.categories.find(c => c.id === categoryId)
  const courseData = categoryId ? trainingConfig.courses[categoryId as keyof typeof trainingConfig.courses] : null

  if (!category || !courseData) {
    return <Navigate to="/training" replace />
  }

  const totalPages = Math.ceil(courseData.items.length / ITEMS_PER_PAGE)
  const paginatedItems = courseData.items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <>
      {/* Hero */}
      <HeroBanner title={courseData.heroTitle} />

      {/* Course List */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Training', href: '/training' },
            { label: category.title },
          ]} />

          <Text as="h2" variant="h2" color="brand-dark" className="mt-8 mb-10">
            {courseData.title}
          </Text>

          {/* Tags filter — desktop: pill buttons, mobile: dropdown */}
          <div className="border-t border-b border-brand-dark/10 py-6">
            {/* Desktop tags */}
            <div className="hidden flex-wrap gap-3 lg:flex">
              {courseData.tags.map((tag, index) => (
                <button
                  key={`${tag}-${index}`}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded px-5 py-2 text-sm font-bold transition-colors ${
                    activeTag === tag
                      ? 'bg-brand-dark text-white'
                      : 'bg-brand-dark text-white opacity-80 hover:opacity-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Mobile dropdown */}
            <div className="lg:hidden">
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                className="w-full appearance-none border-b border-brand-dark bg-transparent pb-2 text-base font-semibold text-brand-dark outline-none"
              >
                {[...new Set(courseData.tags)].map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Course items */}
          <div className="divide-y divide-brand-dark/10">
            {paginatedItems.map((course) => (
              <div key={course.id} className="py-8 lg:py-10">
                {/* Desktop layout */}
                <div className="hidden lg:flex lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-xl">
                    <h5 className="mb-2 text-xl font-bold text-brand-dark">{course.title}</h5>
                    <p className="text-brand-muted">{course.description}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <span className="text-sm font-medium text-brand-muted">Duration - {course.duration}</span>
                    <Link
                      to={`/training/${categoryId}/${course.id}`}
                      className="btn-primary text-sm"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden">
                  <h5 className="mb-2 text-lg font-bold text-brand-dark">{course.title}</h5>
                  <p className="mb-3 text-brand-muted">{course.description}</p>
                  <p className="mb-4 text-sm font-medium text-brand-muted">Duration - {course.duration}</p>
                  <Link
                    to={`/training/${categoryId}/${course.id}`}
                    className="btn-primary block w-full text-center"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="flex items-center gap-1 px-2 py-1 text-brand-muted transition-colors hover:text-brand-dark disabled:opacity-30"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="rotate-180">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[32px] rounded px-2 py-1 font-bold transition-colors ${
                    currentPage === page
                      ? 'text-brand-dark'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="flex items-center gap-1 px-2 py-1 text-brand-muted transition-colors hover:text-brand-dark disabled:opacity-30"
              >
                <span className="hidden sm:inline">Next</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
