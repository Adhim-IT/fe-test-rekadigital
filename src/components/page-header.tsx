"use client"

interface PageHeaderProps {
  title: string
  subtitle: string
  activeTab: string
  tabs: Array<{ name: string; value: string }>
}

export default function PageHeader({ title, subtitle, activeTab, tabs }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Judul Halaman */}
        <div className="mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Subjudul dan Tab Navigasi */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Subjudul */}
          <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-0">{subtitle}</p>

          {/* Tab Navigasi - Dioptimalkan untuk Mobile */}
          <div className="w-full sm:w-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max border-b border-gray-200 pb-1">
                {tabs.map((tab) => (
                  <div key={tab.value} className="mx-3 first:ml-0 last:mr-0">
                    <button
                      className={`pb-2 px-2 sm:px-8 md:px-12 font-medium text-sm transition-colors relative ${
                        activeTab === tab.value ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.name}
                      {activeTab === tab.value && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
