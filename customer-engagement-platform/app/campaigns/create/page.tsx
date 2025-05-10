import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RuleBuilder from "@/components/rule-builder"
import { createCampaign } from "@/lib/actions"

// Mock user for testing without authentication
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  image: "/placeholder.svg?height=32&width=32",
}

export default async function CreateCampaignPage() {
  // Authentication check removed for testing

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={mockUser} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight">Create Campaign</h1>
            <p className="text-muted-foreground">Define your audience segment and create a new campaign.</p>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Segmentation</CardTitle>
                <CardDescription>Build your audience by defining rules to target specific customers.</CardDescription>
              </CardHeader>
              <CardContent>
                <RuleBuilder createCampaign={createCampaign} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
