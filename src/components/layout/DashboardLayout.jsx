import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const DashboardLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop py-8 max-w-container-max-width w-full mx-auto">
          {/* Optional Page Header */}
          {(title || subtitle) && (
            <div className="mb-8 fade-in">
              {title && (
                <h1 className="font-headline-lg text-on-surface mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="font-body-md text-on-surface-variant">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Page Content */}
          <div className="fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout