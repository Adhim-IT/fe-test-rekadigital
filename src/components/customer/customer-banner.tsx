"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setSearchTerm } from "@/store/slices/customerSlice"

interface CustomerBannerProps {
  onAddCustomer: () => void
  onFilter?: () => void
}

export default function CustomerBanner({ onAddCustomer, onFilter }: CustomerBannerProps) {
  const dispatch = useAppDispatch()
  const { searchTerm } = useAppSelector((state) => state.customer)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchTerm(localSearchTerm))
  }

  const handleRefresh = () => {
    setLocalSearchTerm("")
    dispatch(setSearchTerm(""))
    window.location.reload()
  }

  const handleFilter = () => {
    onFilter?.()
    // Tambahkan logika filter di sini
    console.log("Filter clicked")
  }

  return (
    <div className="rounded-xl overflow-hidden relative h-auto min-h-[14rem] md:h-48">
      {/* Gambar Latar Belakang - Lebar Penuh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D5FEF]/90 to-[#5D5FEF]/60"></div>
        <div
          className="absolute right-0 top-0 w-2/4 h-full hidden sm:block"
          style={{
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <Image
            src="/images/background.png"
            alt="Customer management"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Lapisan Konten */}
      <div className="relative z-20 h-full p-3 sm:p-4 md:p-6 flex flex-col justify-between">
        {/* Bagian Header */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3 text-white">Customer</h2>
          <p className="text-white/90 text-xs sm:text-sm max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none">
            On this menu you will be able to create, edit, and also delete the customer. Also you can manage it easily.
          </p>
        </div>

        {/* Bagian Kontrol - Desktop: Baris Tunggal, Mobile: Responsif */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center mt-3 md:mt-4">
          {/* Tombol Tambah Pelanggan Baru */}
          <button
            onClick={onAddCustomer}
            className="flex items-center space-x-1 sm:space-x-2 bg-white/20 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium hover:bg-[#5D5FEF] transition-colors shadow-sm text-xs sm:text-sm whitespace-nowrap w-full md:w-auto justify-center md:justify-start"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Customer</span>
          </button>

          {/* Kontainer Pencarian dan Tombol Aksi */}
          <div className="flex flex-col sm:flex-row w-full md:flex-1 gap-2 md:gap-4 items-start sm:items-center">
            {/* Form Pencarian */}
            <form onSubmit={handleSearch} className="w-full md:max-w-md relative shadow-lg rounded-lg overflow-hidden">
              <div className="relative w-full">
                <svg
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  placeholder="Search Customer"
                  className="w-full pl-7 sm:pl-10 md:pl-12 pr-14 sm:pr-20 md:pr-24 py-1.5 sm:py-2 md:py-3 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-4 md:px-3 py-0.5 sm:py-1 md:py-2 bg-[#5D5FEF] hover:bg-[#4B4DE8] text-white rounded-lg transition-colors font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Tombol Aksi */}
            <div className="flex w-full sm:w-auto justify-between sm:justify-start gap-1 sm:gap-2">
              <button
                onClick={handleFilter}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white flex-1 sm:flex-none"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Filter</span>
              </button>

              <button
                onClick={handleRefresh}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white flex-1 sm:flex-none"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Refresh</span>
              </button>

              {/* Tombol Cetak */}
              <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-colors text-white flex-1 sm:flex-none">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
