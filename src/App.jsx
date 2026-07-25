import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ui/ProtectedRoute'
import { DashboardLayout } from './components/layout/DashboardLayout'

// Page imports
import Landing from './pages/Landing'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import AITutor from './pages/AITutor'
import Notes from './pages/Notes'
// import NoteEditor from './pages/NoteEditor'
import Flashcards from './pages/Flashcards'
import Quizzes from './pages/Quizzes'
import StudyPlan from './pages/StudyPlan'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import Courses from './pages/Courses'
import Library from './pages/Library' 

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Placeholder routes for other pages */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Courses/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ✅ NEW LIBRARY ROUTE */}
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Library/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-tutor"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AITutor/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Notes/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <DashboardLayout title="Flashcards">
              <Flashcards/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/quizzes"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Quizzes/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/study-plan"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <StudyPlan/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Progress/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-background gap-4">
    <h1 className="font-display-lg text-primary">404</h1>
    <p className="font-body-lg text-on-surface-variant">Page not found</p>
  </div>
)

export default App