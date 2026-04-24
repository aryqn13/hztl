import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { IconPencil } from '../components/atoms/Icons'

export function Profile() {
  const { user, loggedIn } = useAuth()

  if (!loggedIn || !user) return <Navigate to="/login" replace />

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-2xl">
          {/* Edit Profile link */}
          <Link
            to="/profile/edit"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark border-b-2 border-brand-dark pb-1 hover:text-brand-dark/70 transition-colors"
          >
            <IconPencil />
            Edit Profile
          </Link>

          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-10 text-brand-dark">My Profile</h2>

          {/* Personal Information */}
          <div className="mb-12">
            <h4 className="mb-2 text-brand-dark">Personal Information</h4>
            <div className="border-t-2 border-brand-dark mb-6"></div>

            <div className="flex flex-col gap-0">
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Full Name</span>
                <span className="text-sm text-brand-dark/80">{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Department</span>
                <span className="text-sm text-brand-dark/80">{user.department || '—'}</span>
              </div>
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Role</span>
                <span className="text-sm text-brand-dark/80">{user.role || '—'}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-2 text-brand-dark">Contact Information</h4>
            <div className="border-t-2 border-brand-dark mb-6"></div>

            <div className="flex flex-col gap-0">
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Password</span>
                <span className="flex-1 text-sm text-brand-dark/80">**********</span>
                <Link
                  to="/profile/change-password"
                  className="text-sm font-semibold text-brand-dark hover:text-brand-dark/70 transition-colors"
                >
                  Change
                </Link>
              </div>
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Email Address</span>
                <span className="text-sm text-brand-dark/80">{user.email}</span>
              </div>
              <div className="flex items-center border-b border-brand-dark/20 py-4">
                <span className="w-36 text-sm font-bold text-brand-dark shrink-0">Mobile Number</span>
                <span className="text-sm text-brand-dark/80">{user.phone || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
