import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { updateProfile } from '../lib/auth'
import { IconArrowLeft } from '../components/atoms/Icons'

export function EditProfile() {
  const { user, loggedIn } = useAuth()
  const navigate = useNavigate()

  // Initialize form state from current user data
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [department, setDepartment] = useState(user?.department || '')
  const [role, setRole] = useState(user?.role || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [emailVal] = useState(user?.email || '')

  if (!loggedIn || !user) return <Navigate to="/login" replace />

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      firstName,
      lastName,
      department,
      role,
      phone,
    })
    navigate('/profile')
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-desktop">
        <div className="mx-auto max-w-2xl">
          {/* Back to Profile */}
          <Link
            to="/profile"
            className="mb-8 inline-flex items-center gap-2 text-sm text-brand-dark hover:text-brand-dark/70 transition-colors"
          >
            <IconArrowLeft />
            <span>Back to Profile</span>
          </Link>

          {/* Decorative bar */}
          <div className="mb-4 h-1.5 w-12 bg-brand-dark"></div>

          <h2 className="mb-10 text-brand-dark">Edit Profile</h2>

          <form onSubmit={handleSave}>
            {/* Personal Information */}
            <div className="mb-12">
              <h4 className="mb-2 text-brand-dark">Personal Information</h4>
              <div className="border-t-2 border-brand-dark mb-6"></div>

              <div className="flex flex-col gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <label className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 border-b border-brand-dark/30 bg-transparent pb-1 text-sm text-brand-dark outline-none focus:border-brand-dark"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <label className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 border-b border-brand-dark/30 bg-transparent pb-1 text-sm text-brand-dark outline-none focus:border-brand-dark"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <label className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="flex-1 appearance-none border-b border-brand-dark/30 bg-transparent pb-1 text-sm text-brand-dark outline-none focus:border-brand-dark"
                  >
                    <option value="" disabled>Select</option>
                    <option value="UI/UX Department">UI/UX Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <label className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex-1 border-b border-brand-dark/30 bg-transparent pb-1 text-sm text-brand-dark outline-none focus:border-brand-dark"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h4 className="mb-2 text-brand-dark">Contact Information</h4>
              <div className="border-t-2 border-brand-dark mb-6"></div>

              <div className="flex flex-col gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <span className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Password</span>
                  <span className="flex-1 text-sm text-brand-dark/80">**********</span>
                  <Link
                    to="/profile/change-password"
                    className="text-sm font-semibold text-brand-dark hover:text-brand-dark/70 transition-colors"
                  >
                    Change
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <span className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Email Address</span>
                  <span className="flex-1 text-sm text-brand-dark/80">{emailVal}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center border-b border-brand-dark/20 py-4">
                  <label className="w-36 text-sm font-bold text-brand-dark shrink-0 mb-1 sm:mb-0">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border-b border-brand-dark/30 bg-transparent pb-1 text-sm text-brand-dark outline-none focus:border-brand-dark"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button type="submit" className="btn-primary">
                Save changes
              </button>
              <Link to="/profile" className="text-link">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
