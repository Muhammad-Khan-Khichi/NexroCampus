import { useState } from 'react'
import { useUIStore } from '../../store/uiStore'
import { useLearningStore } from '../../store/learningStore'
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Upload,
  Command,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TopBar = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const openUploadModal = useUIStore((state) => state.openUploadModal)
  const courses = useLearningStore((state) => state.courses)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Navigate to library with upload view
  const handleUploadClick = () => {
    navigate('/library?view=upload')
  }

  return (
    <header className="sticky top-0 z-30 h-20 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="h-full px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-4">
        {/* Left — Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2.5 rounded-xl hover:bg-surface-container text-on-surface-variant"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, notes, flashcards..."
              className="w-full h-11 pl-11 pr-12 rounded-full bg-surface-container border border-transparent focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all font-body-md text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high text-[10px] font-bold text-on-surface-variant">
              <Command size={10} /> K
            </kbd>

            {/* Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl overflow-hidden">
                {filteredCourses.length > 0 ? (
                  <ul className="py-2">
                    {filteredCourses.map((course) => (
                      <li key={course.id}>
                        <button
                          onClick={() => {
                            navigate('/courses')
                            setSearchQuery('')
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-surface-container text-left"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shrink-0`}>
                            <Sparkles size={16} className="fill-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-label-md text-on-surface truncate">
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
                  <div className="px-4 py-8 text-center text-sm text-on-surface-variant">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-2">
          {/* Upload Button — Navigate to library upload */}
          <button
            onClick={handleUploadClick}
            className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-full bg-primary text-on-primary font-label-md hover:bg-primary-container hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            <Upload size={18} />
            <span className="hidden md:inline">Upload Material</span>
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