"use client"

import { useState } from "react"
import type { Customer } from "@/store/slices/customerSlice"

interface CustomerDetailModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer | null
}

export default function CustomerDetailModal({ isOpen, onClose, customer }: CustomerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "history" | "notes">("info")

  if (!isOpen || !customer) return null

  const formatCurrency = (amount: number) => {
    return `IDR ${amount.toLocaleString("id-ID")}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

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

  // Data riwayat transaksi tiruan
  const transactionHistory = [
    {
      id: "tx1",
      date: "2023-10-15",
      amount: 125000,
      items: ["Nasi Goreng Jamur", "Es Teh Manis"],
      status: "completed",
    },
    {
      id: "tx2",
      date: "2023-09-28",
      amount: 87500,
      items: ["Tongseng Sapi Gurih", "Air Mineral"],
      status: "completed",
    },
    {
      id: "tx3",
      date: "2023-08-12",
      amount: 156000,
      items: ["Nasi Gudeg Telur Ceker", "Es Jeruk"],
      status: "completed",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header dengan gradien */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-[#5D5FEF]/10 to-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Customer Details</h2>
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

        {/* Profil Pelanggan */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5D5FEF]/20 to-[#5D5FEF]/40 rounded-full flex items-center justify-center text-[#5D5FEF] font-bold text-xl">
              {customer.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                    customer.level,
                  )}`}
                >
                  {customer.level}
                </span>
                <span className="ml-3 text-sm text-gray-500">Since {formatDate(customer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-4 py-3 text-sm font-medium relative ${
                activeTab === "info" ? "text-[#5D5FEF]" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Information
              {activeTab === "info" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D5FEF]"></div>}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 text-sm font-medium relative ${
                activeTab === "history" ? "text-[#5D5FEF]" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Transaction History
              {activeTab === "history" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D5FEF]"></div>}
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-3 text-sm font-medium relative ${
                activeTab === "notes" ? "text-[#5D5FEF]" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Notes
              {activeTab === "notes" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5D5FEF]"></div>}
            </button>
          </div>
        </div>

        {/* Konten Tab - Dapat Digulir */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Favorite Menu</p>
                  <p className="text-sm font-medium text-gray-800">{customer.favoriteMenu}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Transaction</p>
                  <p className="text-sm font-medium text-gray-800">{formatCurrency(customer.totalTransaction)}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Customer ID</p>
                <p className="text-sm font-medium text-gray-800">{customer.id}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Customer Since</p>
                <p className="text-sm font-medium text-gray-800">{formatDate(customer.createdAt)}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Loyalty Points</p>
                <p className="text-sm font-medium text-gray-800">
                  {Math.floor(customer.totalTransaction / 10000)} points
                </p>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{formatDate(transaction.date)}</p>
                      <p className="text-xs text-gray-500">ID: {transaction.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{formatCurrency(transaction.amount)}</p>
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-600 border border-green-200">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">Items</p>
                    <div className="flex flex-wrap gap-2">
                      {transaction.items.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Customer Notes</p>
                <p className="text-sm text-gray-700">
                  This customer prefers their food with less spice. They usually visit on weekends and prefer window
                  seating. They have mentioned allergies to peanuts.
                </p>
              </div>

              <div className="mt-4">
                <label htmlFor="notes" className="block text-xs text-gray-500 mb-2">
                  Add Note
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D5FEF] focus:border-[#5D5FEF] transition-colors bg-white text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Add a note about this customer..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="px-3 py-1.5 text-xs text-white bg-[#5D5FEF] hover:bg-[#4B4DE8] rounded-lg transition-colors">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 text-xs sm:text-sm text-white bg-[#5D5FEF] hover:bg-[#4B4DE8] rounded-lg transition-colors">
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  )
}
