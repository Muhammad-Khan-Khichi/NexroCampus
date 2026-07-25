import { useState, useEffect, useRef } from 'react'
import { useUIStore } from '../../store/uiStore'
import { useLearningStore } from '../../store/learningStore'
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Upload,
  Command,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TopBar = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const courses = useLearningStore((state) => state.courses)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUploadClick = () => {
    navigate('/library?view=upload')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultClick = (courseId) => {
    navigate(`/courses/${courseId}`)
    setSearchQuery('')
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left — Mobile Menu + Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
          {/* ✅ FIXED: Hamburger uses custom CSS that always works */}
          <button
            onClick={toggleSidebar}
            className="mobile-only p-2.5 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors shrink-0 items-center justify-center"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md" ref={searchRef}>
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => searchQuery && setSearchOpen(true)}
              placeholder="Search..."
              className="w-full h-10 sm:h-11 pl-11 pr-12 rounded-full bg-surface-container border border-transparent focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all text-sm"
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSearchOpen(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-surface-container text-on-surface-variant"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}

            {!searchQuery && (
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 desktop-only items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high text-[10px] font-bold text-on-surface-variant">
                <Command size={10} /> K
              </kbd>
            )}

            {searchOpen && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                {filteredCourses.length > 0 ? (
                  <ul className="py-2">
                    {filteredCourses.map((course) => (
                      <li key={course.id}>
                        <button
                          onClick={() => handleResultClick(course.id)}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3 hover:bg-surface-container text-left transition-colors"
                        >
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shrink-0`}>
                            <Sparkles size={14} className="fill-white sm:w-4 sm:h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-label-md text-on-surface truncate text-sm">
                              {course.title}
                            </p>
                            <p className="text-xs text-on-surface-variant truncate">
                              {course.code} • {course.materials} materials
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-on-surface-variant">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Upload Button (Desktop) */}
          <button
            onClick={handleUploadClick}
            className="hidden sm:flex items-center gap-2 h-10 sm:h-11 px-3 sm:px-4 rounded-full bg-primary text-on-primary font-label-md hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 text-sm"
          >
            <Upload size={18} />
            <span className="hidden md:inline">Upload</span>
          </button>

          {/* Mobile Upload Icon */}
          <button
            onClick={handleUploadClick}
            className="sm:hidden p-2.5 rounded-xl bg-primary text-on-primary"
            aria-label="Upload material"
          >
            <Upload size={20} />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full ring-2 ring-background" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopBar