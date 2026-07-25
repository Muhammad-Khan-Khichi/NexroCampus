import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { Logo } from '../../components/ui/Logo'
import { SIDEBAR_LINKS, SIDEBAR_FOOTER_LINKS } from '../../constants/index'
import {
  LayoutDashboard,
  School,
  Bot,
  FileText,
  Layers,
  BrainCircuit,
  CalendarDays,
  LineChart,
  Settings,
  HelpCircle,
  ChevronLeft,
  LogOut,
  Sparkles,
} from 'lucide-react'

const ICON_MAP = {
  LayoutDashboard,
  School,
  Bot,
  FileText,
  Layers,
  BrainCircuit,
  CalendarDays,
  LineChart,
  Settings,
  HelpCircle,
}

export const Sidebar = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-[280px] shrink-0
          bg-surface-container-lowest border-r border-outline-variant/40
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        {/* Header — Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-outline-variant/30 shrink-0">
          <Logo size="md" />
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Scrollable Nav */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-4 py-6">
          {/* Main Nav Label */}
          <div className="px-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              Main Menu
            </span>
          </div>

          {/* Main Links */}
          <ul className="space-y-1">
            {SIDEBAR_LINKS.map((link) => {
              const IconComponent = ICON_MAP[link.icon]
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md transition-all group ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`
                    }
                  >
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        className="shrink-0"
                        strokeWidth={2}
                      />
                    )}
                    <span className="truncate">{link.name}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Spacer */}
          <div className="my-8 border-t border-outline-variant/30" />

          {/* Bottom Nav Label */}
          <div className="px-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              Account
            </span>
          </div>

          {/* Bottom Links */}
          <ul className="space-y-1">
            {SIDEBAR_FOOTER_LINKS.map((link) => {
              const IconComponent = ICON_MAP[link.icon]
              return (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md transition-all ${
                        isActive
                          ? 'bg-primary text-on-primary'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`
                    }
                  >
                    {IconComponent && <IconComponent size={20} className="shrink-0" />}
                    <span className="truncate">{link.name}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile & Upgrade */}
        <div className="shrink-0 p-4 border-t border-outline-variant/30 bg-surface-container-low/50">
          {/* Upgrade Card */}
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-4 mb-4 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
            <Sparkles size={18} className="fill-white text-white mb-2" />
            <p className="font-label-md leading-tight mb-3">
              Upgrade to Campus Pro
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-xl text-xs font-bold transition-all">
              Unlock AI
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 p-2 rounded-xl">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary-fixed"
              />
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-on-surface truncate">
                  {user.name}
                </p>
                <p className="text-xs text-on-surface-variant truncate">
                  {user.plan}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors shrink-0"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar