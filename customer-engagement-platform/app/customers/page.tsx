import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getCustomers } from "@/lib/customers"
import CustomerList from "@/components/customer-list"

// Mock user for testing without authentication
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  image: "/placeholder.svg?height=32&width=32",
}

export default async function CustomersPage() {
  // Authentication check removed for testing

  const customers = await getCustomers()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={mockUser} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-2xl font-bold tracking-tight">Customer Database</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
          <div className="mt-6">
            <CustomerList customers={customers} />
          </div>
        </main>
      </div>
    </div>
  )
} 