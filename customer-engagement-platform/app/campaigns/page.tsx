import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getCampaigns } from "@/lib/campaigns"
import CampaignList from "@/components/campaign-list"

// Mock user for testing without authentication
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  image: "/placeholder.svg?height=32&width=32",
}

// Make this page dynamic to ensure it always gets fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CampaignsPage() {
  // Authentication check removed for testing

  const campaigns = await getCampaigns()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={mockUser} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-2xl font-bold tracking-tight">Campaign History</h1>
            <Link href="/campaigns/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <CampaignList campaigns={campaigns} />
          </div>
        </main>
      </div>
    </div>
  )
}
