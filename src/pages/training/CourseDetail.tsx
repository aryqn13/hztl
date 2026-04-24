import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Breadcrumb } from '../../components/atoms/Breadcrumb'
import { Container } from '../../components/atoms/Container'
import trainingConfig from '../../config/training.json'

import defaultAvatar from '../../images/default-user.svg'

// Star rating display
function StarRating({ rating, max = 5, interactive = false, onChange }: {
  rating: number
  max?: number
  interactive?: boolean
  onChange?: (rating: number) => void
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onChange?.(i + 1) : undefined}
          className={`text-lg ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
            i < rating ? 'text-brand-orange' : 'text-brand-muted/30'
          }`}
          aria-label={interactive ? `Rate ${i + 1} star${i > 0 ? 's' : ''}` : undefined}
          disabled={!interactive}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export function CourseDetail() {
  const { categoryId, courseId } = useParams<{ categoryId: string; courseId: string }>()
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  // Look up the course detail
  const courseDetail = courseId
    ? trainingConfig.courseDetails[courseId as keyof typeof trainingConfig.courseDetails]
    : null

  // Look up the category info
  const category = trainingConfig.categories.find(c => c.id === categoryId)

  if (!courseDetail || !category) {
    return <Navigate to="/training" replace />
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    setFeedbackText('')
    setFeedbackRating(0)
  }

  return (
    <>
      {/* Breadcrumb + Content */}
      <section className="bg-white py-8 lg:py-12">
        <Container>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Training', href: '/training' },
            { label: category.title, href: `/training/${categoryId}` },
            { label: courseDetail.title },
          ]} />

          {/* Title */}
          <h2 className="mt-6 mb-6 text-brand-dark">
            {courseDetail.title}
          </h2>

          {/* Main description text */}
          <p className="mb-8 max-w-4xl text-brand-muted leading-relaxed">
            {courseDetail.description}
          </p>

          {/* Code / detail image */}
          <div className="mb-8 overflow-hidden rounded-sm">
            <img
              src={courseDetail.codeImage}
              alt="Course content"
              className="h-auto w-full object-cover"
            />
          </div>

          {/* After-image text */}
          <p className="mb-8 max-w-4xl text-brand-muted leading-relaxed">
            {courseDetail.afterImageText}
          </p>

          {/* Subtitle + bullet points */}
          <h5 className="mb-4 text-xl font-bold text-brand-dark">
            {courseDetail.title}
          </h5>

          <ul className="mb-8 list-disc pl-6 space-y-2">
            {courseDetail.bulletPoints.map((point, index) => (
              <li key={index} className="text-brand-muted">{point}</li>
            ))}
          </ul>

          {/* Video thumbnail */}
          <div className="relative mb-8 overflow-hidden rounded-sm">
            <img
              src={courseDetail.videoThumbnail}
              alt="Video preview"
              className="h-auto w-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition-transform hover:scale-110 lg:h-20 lg:w-20">
                <svg className="ml-1 h-8 w-8 text-white lg:h-10 lg:w-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* After-video text */}
          <p className="mb-0 max-w-4xl text-brand-muted leading-relaxed">
            {courseDetail.afterVideoText}
          </p>
        </Container>
      </section>

      {/* Related Courses */}
      <section className="border-t border-brand-dark/10 bg-white py-12 lg:py-16">
        <Container>
          <h2 className="mb-8 text-brand-dark">Related Courses</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courseDetail.relatedCourses.map((related, index) => (
              <div key={index} className="flex flex-col">
                <div className="mb-4 aspect-[4/3] overflow-hidden bg-brand-surface">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h5 className="mb-2 text-lg font-bold text-brand-dark">
                  {related.title}
                </h5>
                <p className="mb-4 flex-1 text-sm text-brand-muted">
                  {related.description}
                </p>
                <Link
                  to={`/training/${categoryId}/${related.id}`}
                  className="btn-primary self-start text-sm"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feedbacks */}
      <section className="border-t border-brand-dark/10 bg-white py-12 lg:py-16">
        <Container>
          {feedbackSubmitted ? (
            /* Feedback submitted state */
            <div className="flex items-start gap-3 py-6">
              <svg className="mt-0.5 h-6 w-6 shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <div>
                <h5 className="text-lg font-bold text-brand-dark">Feedback submitted - Thank you!</h5>
                <p className="text-brand-muted">Please refresh the page to view your feedback.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Feedbacks list */}
              {courseDetail.feedbacks && courseDetail.feedbacks.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-8 text-brand-dark">Feedbacks</h2>

                  <div className="space-y-8">
                    {courseDetail.feedbacks.map((feedback) => (
                      <div key={feedback.id} className="flex gap-4">
                        <img
                          src={defaultAvatar}
                          alt={feedback.name}
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-brand-dark">{feedback.name}</p>
                          <StarRating rating={feedback.rating} />
                          <p className="mt-1 text-xs text-brand-muted/60">
                            Reviewed on {feedback.date}
                          </p>
                          <p className="mt-2 text-brand-muted leading-relaxed">
                            {feedback.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Feedback form */}
              <div>
                <h5 className="mb-4 text-xl font-bold text-brand-dark">
                  {courseDetail.feedbacks && courseDetail.feedbacks.length > 0
                    ? 'Submit your Feedback'
                    : 'No feedback yet, Please submit your feedback.'}
                </h5>

                <form onSubmit={handleSubmitFeedback} className="max-w-lg">
                  <textarea
                    placeholder="Your Feedback"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={4}
                    className="mb-4 w-full resize-none border border-brand-dark/20 p-4 text-sm text-brand-dark placeholder-brand-muted/60 outline-none focus:border-brand-dark"
                  />

                  <div className="mb-6">
                    <span className="mr-2 text-sm font-bold text-brand-dark">Your Rating:</span>
                    <StarRating
                      rating={feedbackRating}
                      interactive={true}
                      onChange={setFeedbackRating}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary text-sm">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFeedbackText(''); setFeedbackRating(0) }}
                      className="btn-dark text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
