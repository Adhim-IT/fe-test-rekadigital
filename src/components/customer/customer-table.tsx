"use client"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { deleteCustomer, setSorting, setCurrentPage, clearFilters } from "@/store/slices/customerSlice"
import type { Customer } from "@/store/slices/customerSlice"
import Image from "next/image"

interface CustomerTableProps {
  onEditCustomer?: (customer: Customer) => void
}

export default function CustomerTable({ onEditCustomer }: CustomerTableProps) {
  const dispatch = useAppDispatch()
  const { customers, searchTerm, sortBy, sortOrder, currentPage, itemsPerPage, filterOptions } = useAppSelector(
    (state) => state.customer,
  )

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Warga":
        return "bg-orange-100 text-orange-600 border-orange-200"
      case "Juragan":
        return "bg-blue-100 text-blue-600 border-blue-200"
      case "Sultan":
        return "bg-green-100 text-green-600 border-green-200"
      case "Konglomerat":
        return "bg-purple-100 text-purple-600 border-purple-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const formatCurrency = (amount: number) => {
    return `IDR ${amount.toLocaleString("id-ID")}`
  }

  // Filter customers based on search term and filter options
  const filteredCustomers = customers.filter((customer) => {
    // Search term filter
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    if (!matchesSearch) return false

    // Apply additional filters if they exist
    if (filterOptions) {
      // Filter by level
      if (filterOptions.level.length > 0 && !filterOptions.level.includes(customer.level)) {
        return false
      }

      // Filter by transaction amount
      const minTransaction = Number(filterOptions.minTransaction) || 0
      const maxTransaction = Number(filterOptions.maxTransaction) || Number.POSITIVE_INFINITY
      if (customer.totalTransaction < minTransaction || customer.totalTransaction > maxTransaction) {
        return false
      }

      // Filter by date range
      if (filterOptions.startDate && new Date(customer.createdAt) < new Date(filterOptions.startDate)) {
        return false
      }
      if (filterOptions.endDate && new Date(customer.createdAt) > new Date(filterOptions.endDate)) {
        return false
      }

      // Filter by favorite menu
      if (
        filterOptions.favoriteMenu &&
        !customer.favoriteMenu.toLowerCase().includes(filterOptions.favoriteMenu.toLowerCase())
      ) {
        return false
      }
    }

    return true
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (!sortBy) return 0

    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  // Paginate customers
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage)

  const handleSort = (column: keyof Customer) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc"
    dispatch(setSorting({ sortBy: column, sortOrder: newSortOrder }))
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id))
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const SortIcon = ({ column }: { column: keyof Customer }) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      )
    }

    return sortOrder === "asc" ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  // Update the customer table to be more responsive
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Active Filters */}
      {filterOptions && (
        <div className="px-3 sm:px-6 py-3 bg-blue-50 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-blue-700 mr-3 mb-2 sm:mb-0">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.level.length > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                  Level: {filterOptions.level.join(", ")}
                </span>
              )}
              {(filterOptions.minTransaction || filterOptions.maxTransaction) && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                  Transaction: {filterOptions.minTransaction || "0"} - {filterOptions.maxTransaction || "∞"}
                </span>
              )}
              {(filterOptions.startDate || filterOptions.endDate) && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                  Date: {filterOptions.startDate || "Any"} to {filterOptions.endDate || "Any"}
                </span>
              )}
              {filterOptions.favoriteMenu && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                  Menu: {filterOptions.favoriteMenu}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 sm:mt-0"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>Customer Name</span>
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                <button
                  onClick={() => handleSort("level")}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>Level</span>
                  <SortIcon column="level" />
                </button>
              </th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left">
                <button
                  onClick={() => handleSort("favoriteMenu")}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>Favorite Menu</span>
                  <SortIcon column="favoriteMenu" />
                </button>
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left">
                <button
                  onClick={() => handleSort("totalTransaction")}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <span>Total Transaction</span>
                  <SortIcon column="totalTransaction" />
                </button>
              </th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-800">{customer.name}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                        customer.level,
                      )}`}
                    >
                      {customer.level}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm text-gray-600">{customer.favoriteMenu}</span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-800">
                      {formatCurrency(customer.totalTransaction)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1.5 sm:p-2 text-black hover:bg-blue-50 rounded-lg transition-colors flex items-center bg-gray-50 border border-gray-100">
                        <Image src="/images/icons/detail.png" alt="eye" width={15} height={15} />
                        <p className="ml-1 text-xs sm:text-sm">Detail</p>
                      </button>
                      <button
                        onClick={() => onEditCustomer?.(customer)}
                        className="p-1.5 sm:p-2hover:bg-green-50 text-black rounded-lg transition-colors flex items-center bg-gray-50 border border-gray-100 pr-2 pt-2 pb-2 pl-2 "
                      >
                        <Image src="/images/icons/edit.png" alt="edit" width={15} height={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center bg-[#FEF5F6] border border-[#FEF5F6] pr-2 pt-2 pb-2 pl-2 "
                      >
                        <Image src="/images/icons/delete.png" alt="delete" width={15} height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 sm:px-6 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm">
                  No customers found matching your filters. Try adjusting your search or filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Make it more responsive */}
      <div className="px-3 sm:px-6 py-4 sm:py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
          Showing {filteredCustomers.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} Data Customers
        </div>

        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300"
            aria-label="Previous page"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers - Simplified for mobile */}
          <div className="flex items-center space-x-1">
            {/* Show first page */}
            <button
              onClick={() => handlePageChange(1)}
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-900 bg-transparent border-gray-900 shadow-sm"
                  : "text-gray-700 bg-transparent border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              1
            </button>

            {/* Ellipsis for many pages */}
            {currentPage > 3 && (
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                <span className="text-gray-400 font-medium">...</span>
              </div>
            )}

            {/* Current page neighborhood */}
            {currentPage > 2 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg border text-gray-700 bg-transparent border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                {currentPage - 1}
              </button>
            )}

            {/* Current page (if not 1) */}
            {currentPage !== 1 && currentPage !== totalPages && (
              <button
                onClick={() => handlePageChange(currentPage)}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg border text-gray-900 bg-transparent border-gray-900 shadow-sm transition-all duration-200"
              >
                {currentPage}
              </button>
            )}

            {/* Next page */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg border text-gray-700 bg-transparent border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                {currentPage + 1}
              </button>
            )}

            {/* Ellipsis for many pages */}
            {currentPage < totalPages - 2 && (
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                <span className="text-gray-400 font-medium">...</span>
              </div>
            )}

            {/* Last page (if not 1) */}
            {totalPages > 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 ${
                  currentPage === totalPages
                    ? "text-gray-900 bg-transparent border-gray-900 shadow-sm"
                    : "text-gray-700 bg-transparent border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-300"
            aria-label="Next page"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
