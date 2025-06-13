"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import PageHeader from "./page-header"
import CustomerBanner from "./customer/customer-banner"
import CustomerTable from "./customer/customer-table"
import AddCustomerModal from "./customer/add-customer-modal"
import FilterModal from "./customer/filter-modal"
import CustomerDetailModal from "./customer/customer-detail-modal"
import AnalyticsSidebar from "./analytics/analytics-sidebar"
import type { Customer } from "@/store/slices/customerSlice"

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleAddCustomer = () => {
    setEditingCustomer(null)
    setIsAddModalOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsAddModalOpen(true)
  }

  const handleViewCustomerDetail = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setEditingCustomer(null)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedCustomer(null)
  }

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const tabs = [
    { name: "Customer", value: "customer" },
    { name: "Promo", value: "promo" },
    { name: "Voucher", value: "voucher" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 w-full lg:ml-64 pt-12 lg:pt-0">
        {/* Page Header */}
        <PageHeader
          title="Customer"
          subtitle="You can manage and organize your customer and other things here"
          activeTab="customer"
          tabs={tabs}
        />

        {/* Main Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Content Layout */}
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
              {/* Left Column - Banner and Table */}
              <div className="flex-1 w-full">
                {/* Customer Banner */}
                <div className="mb-4 sm:mb-6">
                  <CustomerBanner onAddCustomer={handleAddCustomer} onFilter={handleOpenFilterModal} />
                </div>

                {/* Customer Table */}
                <CustomerTable onEditCustomer={handleEditCustomer} onViewCustomerDetail={handleViewCustomerDetail} />
              </div>

              {/* Right Column - Analytics Sidebar */}
              <div className="w-full xl:w-80">
                <AnalyticsSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal isOpen={isAddModalOpen} onClose={handleCloseModal} editingCustomer={editingCustomer} />

      {/* Filter Modal */}
      <FilterModal isOpen={isFilterModalOpen} onClose={handleCloseFilterModal} />

      {/* Customer Detail Modal */}
      <CustomerDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} customer={selectedCustomer} />
    </div>
  )
}
