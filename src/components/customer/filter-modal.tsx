"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setFilterOptions, clearFilters } from "@/store/slices/customerSlice"
import type { FilterOptions } from "@/store/slices/customerSlice"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const dispatch = useAppDispatch()
  const { filterOptions } = useAppSelector((state) => state.customer)

  const [filters, setFilters] = useState<FilterOptions>({
    level: filterOptions?.level || [],
    minTransaction: filterOptions?.minTransaction || "",
    maxTransaction: filterOptions?.maxTransaction || "",
    startDate: filterOptions?.startDate || "",
    endDate: filterOptions?.endDate || "",
    favoriteMenu: filterOptions?.favoriteMenu || "",
  })

  useEffect(() => {
    if (isOpen) {
      // Reset filters to current state when modal opens
      setFilters({
        level: filterOptions?.level || [],
        minTransaction: filterOptions?.minTransaction || "",
        maxTransaction: filterOptions?.maxTransaction || "",
        startDate: filterOptions?.startDate || "",
        endDate: filterOptions?.endDate || "",
        favoriteMenu: filterOptions?.favoriteMenu || "",
      })
    }
  }, [isOpen, filterOptions])

  const handleLevelChange = (level: string) => {
    if (filters.level.includes(level)) {
      setFilters({
        ...filters,
        level: filters.level.filter((l) => l !== level),
      })
    } else {
      setFilters({
        ...filters,
        level: [...filters.level, level],
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleApplyFilters = () => {
    dispatch(setFilterOptions(filters))
    onClose()
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    setFilters({
      level: [],
      minTransaction: "",
      maxTransaction: "",
      startDate: "",
      endDate: "",
      favoriteMenu: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-[#5D5FEF]/10 to-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filter Customers</h2>
            <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Customer Level */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Customer Level</h3>
            <div className="flex flex-wrap gap-2">
              {["Warga", "Juragan", "Sultan", "Konglomerat"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelChange(level)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
                    filters.level.includes(level)
                      ? "bg-[#5D5FEF]/10 border-[#5D5FEF]/30 text-[#5D5FEF]"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Range */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Transaction Range (IDR)</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label htmlFor="minTransaction" className="text-xs text-gray-500 mb-1 block">
                  Min
                </label>
                <input
                  type="number"
                  id="minTransaction"
                  name="minTransaction"
                  value={filters.minTransaction}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="maxTransaction" className="text-xs text-gray-500 mb-1 block">
                  Max
                </label>
                <input
                  type="number"
                  id="maxTransaction"
                  name="maxTransaction"
                  value={filters.maxTransaction}
                  onChange={handleInputChange}
                  placeholder="1,000,000"
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Date Range</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label htmlFor="startDate" className="text-xs text-gray-500 mb-1 block">
                  From
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="endDate" className="text-xs text-gray-500 mb-1 block">
                  To
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors placeholder-gray-400 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Favorite Menu */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Favorite Menu</h3>
            <input
              type="text"
              id="favoriteMenu"
              name="favoriteMenu"
              value={filters.favoriteMenu}
              onChange={handleInputChange}
              placeholder="Search by favorite menu"
              className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors placeholder-gray-400 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto"
          >
            Clear Filters
          </button>
          <div className="flex gap-3 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm text-white bg-[#5D5FEF] hover:bg-[#4B4DE8] rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
