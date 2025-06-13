"use client"

import { useAppSelector } from "@/store/hooks"
import Image from "next/image"

export default function AnalyticsSidebar() {
  const { customers } = useAppSelector((state) => state.customer)

  // Menghitung data analitik
  const totalCustomers = customers.length

  console.log(totalCustomers)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-80 sm:h-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden mx-auto">
        {/* Kurva dekoratif latar belakang */}
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 right-0 w-full h-full"
            viewBox="0 0 320 384"
            fill="none"
            preserveAspectRatio="xMaxYMax slice"
          >
            <path
              d="M200 384C200 320 240 280 280 280C320 280 360 240 360 180"
              stroke="white"
              strokeWidth="1.5 sm:2"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M160 384C160 300 200 220 260 220C320 220 380 160 380 80"
              stroke="white"
              strokeWidth="1.5 sm:2"
              fill="none"
              opacity="0.2"
            />
          </svg>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Judul utama */}
          <div className="mb-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-1 sm:mb-2">
              See analytics of
            </h1>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-1 sm:mb-2">the Customer</h1>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-3 sm:mb-4">Clearly</h1>
          </div>

          {/* Tombol */}
          <div className="mt-auto">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border border-white/20">
              See Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Kartu Menu Teratas Minggu Ini */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <h3 className="md:text-3xl sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">Top Menu</h3>
            <p className="md:text-3xl text-orange-600 font-semibold text-base sm:text-lg">This Week</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="md:text-lg sm:text-xs text-gray-500 font-medium">10 - 12 Agustus 2023</p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {/* Kartu Khusus - Nasi Goreng Jamur */}
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 relative">
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-sm font-bold transform rotate-12">
                <Image src="/images/icon-1.png" alt="Nasi Goreng Jamur" width={40} height={40} />
              </div>
            </div>
            <div className="flex items-start justify-between pr-4 sm:pr-6">
              <div className="flex-1">
                <p className="md:text-xl sm:text-sm font-semibold text-gray-800 leading-tight">Nasi Goreng Jamur</p>
                <p className="md:text-xl sm:text-sm font-semibold text-gray-800 leading-tight">Special Resto Pak Min</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3">
            <span className="text-gray-400 font-medium text-xs sm:text-sm min-w-[16px]">2.</span>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Tongseng Sapi Gurih</p>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3">
            <span className="text-gray-400 font-medium text-xs sm:text-sm min-w-[16px]">3.</span>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Nasi Gudeg Telur Ceker</p>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3">
            <span className="text-gray-400 font-medium text-xs sm:text-sm min-w-[16px]">4.</span>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Nasi Ayam serundeng</p>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3">
            <span className="text-gray-400 font-medium text-xs sm:text-sm min-w-[16px]">5.</span>
            <p className="text-xs sm:text-sm font-medium text-gray-700">Nasi Goreng Seafood</p>
          </div>
        </div>

        {/* Visualisasi Grafik yang Ditingkatkan */}
        <div className="h-32 sm:h-40 relative bg-gradient-to-t from-orange-50 to-white rounded-lg p-3 sm:p-4">
          {/* Area grafik */}
          <svg className="w-full h-full" viewBox="0 0 280 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Garis grid */}
            <g stroke="#f3f4f6" strokeWidth="0.5" opacity="0.5">
              <line x1="0" y1="20" x2="280" y2="20" />
              <line x1="0" y1="40" x2="280" y2="40" />
              <line x1="0" y1="60" x2="280" y2="60" />
              <line x1="0" y1="80" x2="280" y2="80" />
              <line x1="0" y1="100" x2="280" y2="100" />
            </g>

            {/* Isian area utama */}
            <path
              d="M0,100 L20,95 L40,90 L60,85 L80,75 L100,70 L120,65 L140,55 L160,50 L180,45 L200,40 L220,35 L240,30 L260,25 L280,20 L280,120 L0,120 Z"
              fill="url(#orangeGradient)"
            />

            {/* Garis utama dengan efek cahaya */}
            <path
              d="M0,100 L20,95 L40,90 L60,85 L80,75 L100,70 L120,65 L140,55 L160,50 L180,45 L200,40 L220,35 L240,30 L260,25 L280,20"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#glow)"
            />

            {/* Titik data */}
            <g fill="#f97316">
              <circle cx="0" cy="100" r="2" opacity="0.7" />
              <circle cx="40" cy="90" r="2.5" opacity="0.8" />
              <circle cx="80" cy="75" r="3" opacity="0.9" />
              <circle cx="120" cy="65" r="3" opacity="0.9" />
              <circle cx="160" cy="50" r="3.5" opacity="1" />
              <circle cx="200" cy="40" r="3.5" opacity="1" />
              <circle cx="240" cy="30" r="3" opacity="0.9" />
              <circle cx="280" cy="20" r="2.5" opacity="0.8" />
            </g>

            {/* Sorot titik puncak */}
            <circle cx="160" cy="50" r="5" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.6">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  )
}
