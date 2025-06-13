"use client"

interface PageHeaderProps {
  title: string
  subtitle: string
  activeTab: string
  tabs: Array<{ name: string; value: string }>
}

export default function PageHeader({ title, subtitle, activeTab, tabs }: PageHeaderProps) {
  // Update the page header to be more responsive with better text wrapping and spacing
  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</h1>
          <p className="text-gray-600 text-xs sm:text-sm max-w-3xl break-words">{subtitle}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="relative border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`pb-3 px-4 sm:px-6 lg:px-12 font-medium text-xs sm:text-sm transition-colors relative whitespace-nowrap ${
                  activeTab === tab.value ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
                {activeTab === tab.value && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
