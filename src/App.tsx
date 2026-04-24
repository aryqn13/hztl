import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ContactUs } from './pages/ContactUs'
import { TrainingLanding } from './pages/training/TrainingLanding'
import { CategoryCourses } from './pages/training/CategoryCourses'
import { CourseDetail } from './pages/training/CourseDetail'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ThankYou } from './pages/ThankYou'
import { ForgotPassword } from './pages/ForgotPassword'
import { Profile } from './pages/Profile'
import { EditProfile } from './pages/EditProfile'
import { ChangePassword } from './pages/ChangePassword'
import { CertificationLanding } from './pages/CertificationLanding'
import { NotFound } from './pages/NotFound'
import { ScrollToTop } from './components/atoms'
import { useAuth } from './lib/useAuth'

export default function App() {
  const { loggedIn } = useAuth()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-brand-surface">
        <Navbar isLoggedIn={loggedIn} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/training" element={<TrainingLanding />} />
            <Route path="/training/:categoryId" element={<CategoryCourses />} />
            <Route path="/training/:categoryId/:courseId" element={<CourseDetail />} />
            <Route path="/certification" element={<CertificationLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
