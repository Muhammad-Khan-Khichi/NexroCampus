import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, signupSchema } from '../utils/validation'
import { useAuthStore } from '../store/authStore'
import { Logo } from '../components/ui/Logo'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  Brain,
  Trophy,
  Shield,
} from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const signup = useAuthStore((state) => state.signup)

  const [mode, setMode] = useState(
    location.pathname === '/signup' ? 'signup' : 'login'
  )
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const isLogin = mode === 'login'
  const isSignup = mode === 'signup'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    setServerError('')
    try {
      if (isLogin) {
        const result = await login(data.email, data.password)
        if (result.success) {
          navigate('/dashboard')
        } else {
          setServerError(result.error || 'Invalid credentials')
        }
      } else {
        const result = await signup(data.name, data.email, data.password)
        if (result.success) {
          navigate('/dashboard')
        } else {
          setServerError(result.error || 'Signup failed')
        }
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again.')
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setServerError('')
    reset()
  }

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-background">
      {/* ===== LEFT — Form Section ===== */}
      <div className="flex-1 flex flex-col justify-start lg:justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-6 sm:py-8 lg:py-8 overflow-y-auto">
        {/* Logo */}
        <Link to="/" className="inline-block mb-8 sm:mb-10 lg:mb-12 shrink-0">
          <Logo size="lg" />
        </Link>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto flex-1 lg:flex-none">
          {/* Heading */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display-lg text-on-surface mb-2 sm:mb-3 leading-tight">
              {isLogin && 'Welcome back.'}
              {isSignup && 'Create your account.'}
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {isLogin && 'Sign in to continue your learning journey'}
              {isSignup && 'Join 15,000+ students studying smarter'}
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-error-container/30 border border-error/20 rounded-xl flex items-start gap-3">
              <Shield size={20} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error font-medium">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            {/* Name (Signup only) */}
            {isSignup && (
              <div>
                <label className="block font-label-md text-on-surface mb-2 text-sm">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                  />
                  <input
                    type="text"
                    placeholder="Alex Rivera"
                    className={`w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low border-2 text-sm sm:text-base ${
                      errors.name ? 'border-error' : 'border-transparent'
                    } focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all`}
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-error flex items-center gap-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-label-md text-on-surface mb-2 text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  type="email"
                  placeholder="you@university.edu"
                  className={`w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low border-2 text-sm sm:text-base ${
                    errors.email ? 'border-error' : 'border-transparent'
                  } focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-label-md text-on-surface mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                  className={`w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-low border-2 text-sm sm:text-base ${
                    errors.password ? 'border-error' : 'border-transparent'
                  } focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs sm:text-sm text-primary hover:text-primary-container font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 my-5 sm:my-6">
              <div className="flex-1 h-px bg-outline-variant" />
              <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider whitespace-nowrap">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-outline-variant" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                className="h-12 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 font-label-md text-xs sm:text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="h-12 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 font-label-md text-xs sm:text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-on-surface shrink-0">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Toggle Mode */}
            <p className="text-center text-xs sm:text-sm text-on-surface-variant mt-6">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => switchMode(isLogin ? 'signup' : 'login')}
                className="text-primary hover:text-primary-container font-bold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 sm:pt-8 text-center text-xs text-on-surface-variant shrink-0">
          © 2024 Nexro Campus AI. Protocol Secured.
        </div>
      </div>

      {/* ===== RIGHT — Visual Section (Hidden on Mobile) ===== */}
      <div className="hidden lg:flex flex-1 relative gradient-mesh overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-16 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant rounded-full font-label-sm mb-8 border border-primary/10 self-start text-sm">
            <Sparkles size={14} className="fill-primary text-primary" />
            AI-Powered Learning
          </div>

          {/* Quote */}
          <h2 className="text-3xl xl:text-4xl font-display-lg text-on-surface mb-6 max-w-lg leading-tight">
            Turn your <span className="italic font-serif-accent text-primary">lectures</span> into knowledge.
          </h2>

          <p className="text-base xl:text-lg text-on-surface-variant max-w-md mb-12 leading-relaxed">
            Join thousands of students using Nexro to study smarter, not harder.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 xl:gap-6 max-w-lg">
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <BookOpen size={18} className="xl:w-5 xl:h-5" />
                <span className="text-xl xl:text-2xl font-display-lg">15K+</span>
              </div>
              <p className="text-xs text-on-surface-variant">Active Students</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Brain size={18} className="xl:w-5 xl:h-5" />
                <span className="text-xl xl:text-2xl font-display-lg">2M+</span>
              </div>
              <p className="text-xs text-on-surface-variant">AI Generations</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Trophy size={18} className="xl:w-5 xl:h-5" />
                <span className="text-xl xl:text-2xl font-display-lg">4.9★</span>
              </div>
              <p className="text-xs text-on-surface-variant">User Rating</p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="mt-12 glass-card p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-sm shrink-0">
                SJ
              </div>
              <div>
                <p className="font-label-md text-on-surface text-sm">Sarah Johnson</p>
                <p className="text-xs text-on-surface-variant">Pre-Med Student</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant italic font-serif-accent">
              "Nexro cut my study time in half. The AI tutor actually understands my coursework!"
            </p>
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default Login