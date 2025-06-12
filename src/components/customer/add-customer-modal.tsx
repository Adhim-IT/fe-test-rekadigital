"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { addCustomer, type Customer } from "@/store/slices/customerSlice"

interface AddCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  editingCustomer?: Customer | null
}

export default function AddCustomerModal({ isOpen, onClose, editingCustomer }: AddCustomerModalProps) {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    name: editingCustomer?.name || "",
    level: editingCustomer?.level || ("Warga" as const),
    favoriteMenu: editingCustomer?.favoriteMenu || "",
    totalTransaction: editingCustomer?.totalTransaction || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.favoriteMenu.trim()) {
      alert("Please fill in all required fields")
      return
    }

    dispatch(addCustomer(formData))
    setFormData({
      name: "",
      level: "Warga",
      favoriteMenu: "",
      totalTransaction: 0,
    })
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalTransaction" ? Number(value) : value,
    }))
  }

  if (!isOpen) return null

  // Update the add customer modal to be more responsive
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
            >
              Customer Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
            >
              Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="Warga">Warga</option>
              <option value="Juragan">Juragan</option>
              <option value="Sultan">Sultan</option>
              <option value="Konglomerat">Konglomerat</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="favoriteMenu"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
            >
              Favorite Menu *
            </label>
            <input
              type="text"
              id="favoriteMenu"
              name="favoriteMenu"
              value={formData.favoriteMenu}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Enter favorite menu"
              required
            />
          </div>

          <div>
            <label
              htmlFor="totalTransaction"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
            >
              Total Transaction (IDR)
            </label>
            <input
              type="number"
              id="totalTransaction"
              name="totalTransaction"
              value={formData.totalTransaction}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              placeholder="Enter total transaction"
              min="0"
            />
          </div>

          <div className="flex space-x-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
            >
              {editingCustomer ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
