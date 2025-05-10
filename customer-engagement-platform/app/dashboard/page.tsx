import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Users, Mail } from "lucide-react"

// Mock user for testing without authentication
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  image: "/placeholder.svg?height=32&width=32",
}

export default async function DashboardPage() {
  // Authentication check removed for testing

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={mockUser} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 scheduled for next week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.2%</div>
                <p className="text-xs text-muted-foreground">+2.5% from last campaign</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Create new campaigns or manage your data</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Link href="/campaigns/create">
                  <Button className="w-full">Create New Campaign</Button>
                </Link>
                <Link href="/campaigns">
                  <Button variant="outline" className="w-full">
                    View Campaign History
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
