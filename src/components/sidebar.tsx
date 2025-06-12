"use client"

import Image from "next/image"
import { useState } from "react"

const menuItems = [
  {
    name: "Dashboard",
    iconPath: "/images/icons/dashboard.png",
    active: false,
    hasNotification: true,
    notificationCount: 4,
  },
  { name: "Stock", iconPath: "/images/icons/stock.png", active: false },
  { name: "Customer", iconPath: "/images/icons/customer.png", active: true },
  { name: "Restaurant", iconPath: "/images/icons/restaurant.png", active: false },
  { name: "Design", iconPath: "/images/icons/design.png", active: false },
  { name: "Report", iconPath: "/images/icons/report.png", active: false },
  { name: "Role & Admin", iconPath: "/images/icons/role-admin.png", active: false },
  { name: "Settings", iconPath: "/images/icons/settings.png", active: false },
]

const integrationItems = [
  { name: "Stock", iconPath: "/images/icons/stock.png" },
  { name: "Supply", iconPath: "/images/icons/supply.png" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
        aria-label="Toggle menu"
      >
        <div className="w-5 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-gray-600 transition-all duration-300 transform origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block h-0.5 w-full bg-gray-600 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-full bg-gray-600 transition-all duration-300 transform origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-xl transform transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 flex flex-col border-r border-gray-100
      `}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-gray-50">
          <div className="flex items-center">
            {/* Desktop Logo */}
            <div className="hidden lg:block">
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            {/* Mobile Logo */}
            <div className="block lg:hidden relative mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/images/logo/union.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="px-4 flex-1 overflow-y-auto py-4">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Menu</p>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`
                    group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 relative
                    ${
                      item.active
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }
                  `}
                >
                  {item.active && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full"></div>
                  )}

                  <div className="flex items-center space-x-3">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          item.active ? "bg-white shadow-sm" : "group-hover:bg-white group-hover:shadow-sm"
                        } transition-all duration-200`}
                      >
                        <Image
                          src={item.iconPath || "/placeholder.svg"}
                          alt={`${item.name} icon`}
                          width={16}
                          height={16}
                          className={`w-4 h-4 ${item.active ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}
                          onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=16&width=16&text=${item.name[0]}`
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className={`font-medium text-sm ${item.active ? "text-blue-700" : "group-hover:text-gray-800"}`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Notification Badge */}
                  {item.hasNotification && item.notificationCount && (
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-semibold shadow-sm">
                      {item.notificationCount}
                    </div>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Integration Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Integration</p>
            <nav className="space-y-1">
              {integrationItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="group flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200"
                >
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                    <Image
                      src={item.iconPath || "/placeholder.svg"}
                      alt={`${item.name} icon`}
                      width={16}
                      height={16}
                      className="w-4 h-4 opacity-60 group-hover:opacity-80"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=16&width=16&text=${item.name[0]}`
                      }}
                    />
                  </div>
                  <span className="font-medium text-sm group-hover:text-gray-800">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              <Image src="/images/profile.png" alt="User" width={100} height={100} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">Savannah N</p>
              <p className="text-xs text-gray-500">Food Quality Manager</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="group flex items-center justify-center space-x-2 w-full px-3 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-xl border border-red-100 hover:border-red-200 hover:shadow-sm">
              <Image src="/images/icons/logout.png" alt="Logout" width={16} height={16} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
