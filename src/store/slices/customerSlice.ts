import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Customer {
  id: string
  name: string
  level: "Warga" | "Juragan" | "Sultan" | "Konglomerat"
  favoriteMenu: string
  totalTransaction: number
  createdAt: string
}

export interface FilterOptions {
  level: string[]
  minTransaction: string | number
  maxTransaction: string | number
  startDate: string
  endDate: string
  favoriteMenu: string
}

interface CustomerState {
  customers: Customer[]
  searchTerm: string
  sortBy: keyof Customer | null
  sortOrder: "asc" | "desc"
  currentPage: number
  itemsPerPage: number
  filterOptions: FilterOptions | null
}

// List of favorite menu items to use for generating data
const favoriteMenus = [
  "Chicken & Ribs Combo",
  "Surf & Turf Gift Basket",
  "Fried Chicken Dinner",
  "BBQ Rib Dinner",
  "Dark & Stormy",
  "Shaking Beef Tri-Tip",
  "Nasi Goreng Jamur",
  "Tongseng Sapi Gurih",
  "Nasi Gudeg Telur Ceker",
  "Nasi Ayam Serundeng",
  "Nasi Goreng Seafood",
  "Sate Ayam Madura",
  "Gado-gado Jakarta",
  "Soto Betawi",
  "Rendang Daging Sapi",
]

// Generate 40 customers (10 original + 30 new)
const generateCustomers = (): Customer[] => {
  // Original 10 customers
  const originalCustomers: Customer[] = [
    {
      id: "1",
      name: "Odis Rhinehart",
      level: "Warga",
      favoriteMenu: "Chicken & Ribs Combo",
      totalTransaction: 194700,
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Kris Roher",
      level: "Warga",
      favoriteMenu: "Surf & Turf Gift Basket",
      totalTransaction: 651200,
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Serenity Fisher",
      level: "Juragan",
      favoriteMenu: "Fried Chicken Dinner",
      totalTransaction: 1040920,
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "Brooklyn Warren",
      level: "Sultan",
      favoriteMenu: "Surf & Turf Gift Basket",
      totalTransaction: 750500,
      createdAt: "2023-04-05",
    },
    {
      id: "5",
      name: "Franco Delort",
      level: "Juragan",
      favoriteMenu: "Chicken & Ribs Combo",
      totalTransaction: 96000,
      createdAt: "2023-05-12",
    },
    {
      id: "6",
      name: "Saul Geoghegan",
      level: "Juragan",
      favoriteMenu: "Surf & Turf Gift Basket",
      totalTransaction: 256000,
      createdAt: "2023-06-18",
    },
    {
      id: "7",
      name: "Alfredo Vetrovs",
      level: "Juragan",
      favoriteMenu: "Dark & Stormy",
      totalTransaction: 590080,
      createdAt: "2023-07-22",
    },
    {
      id: "8",
      name: "Cristofer Vetrovs",
      level: "Konglomerat",
      favoriteMenu: "Shaking Beef Tri-Tip",
      totalTransaction: 782600,
      createdAt: "2023-08-14",
    },
    {
      id: "9",
      name: "Calvin Steward",
      level: "Konglomerat",
      favoriteMenu: "BBQ Rib Dinner",
      totalTransaction: 467500,
      createdAt: "2023-09-08",
    },
    {
      id: "10",
      name: "Calvin Steward",
      level: "Konglomerat",
      favoriteMenu: "BBQ Rib Dinner",
      totalTransaction: 467500,
      createdAt: "2023-10-03",
    },
  ]

  // Generate 30 additional customers
  const levels: Array<"Warga" | "Juragan" | "Sultan" | "Konglomerat"> = ["Warga", "Juragan", "Sultan", "Konglomerat"]
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Sarah",
    "David",
    "Emma",
    "Robert",
    "Olivia",
    "William",
    "Sophia",
    "James",
    "Ava",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Charlotte",
    "Alexander",
    "Amelia",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ]

  const additionalCustomers: Customer[] = []

  for (let i = 11; i <= 40; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const level = levels[Math.floor(Math.random() * levels.length)]
    const favoriteMenu = favoriteMenus[Math.floor(Math.random() * favoriteMenus.length)]
    const totalTransaction = Math.floor(Math.random() * 1000000) + 50000

    // Generate a date between 2023-01-01 and 2023-12-31
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")
    const createdAt = `2023-${month}-${day}`

    additionalCustomers.push({
      id: i.toString(),
      name: `${firstName} ${lastName}`,
      level,
      favoriteMenu,
      totalTransaction,
      createdAt,
    })
  }

  return [...originalCustomers, ...additionalCustomers]
}

const initialState: CustomerState = {
  customers: generateCustomers(),
  searchTerm: "",
  sortBy: null,
  sortOrder: "asc",
  currentPage: 1,
  itemsPerPage: 10,
  filterOptions: null,
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Omit<Customer, "id" | "createdAt">>) => {
      const newCustomer: Customer = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      state.customers.unshift(newCustomer)
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload)
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setSorting: (state, action: PayloadAction<{ sortBy: keyof Customer; sortOrder: "asc" | "desc" }>) => {
      state.sortBy = action.payload.sortBy
      state.sortOrder = action.payload.sortOrder
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setFilterOptions: (state, action: PayloadAction<FilterOptions>) => {
      state.filterOptions = action.payload
      state.currentPage = 1
    },
    clearFilters: (state) => {
      state.filterOptions = null
      state.currentPage = 1
    },
  },
})

export const {
  addCustomer,
  deleteCustomer,
  setSearchTerm,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setFilterOptions,
  clearFilters,
} = customerSlice.actions

export default customerSlice.reducer
