"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Home, Users } from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      <Link href="/dashboard">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted")}>
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/campaigns">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/campaigns" && "bg-muted")}>
          <FileText className="mr-2 h-4 w-4" />
          Campaigns
        </Button>
      </Link>
      <Link href="/campaigns/create">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/campaigns/create" && "bg-muted")}>
          <BarChart3 className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </Link>
      <Link href="/customers">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/customers" && "bg-muted")}>
          <Users className="mr-2 h-4 w-4" />
          Customers
        </Button>
      </Link>
      <Link href="/api-docs">
        <Button variant="ghost" className={cn("w-full justify-start", pathname === "/api-docs" && "bg-muted")}>
          <FileText className="mr-2 h-4 w-4" />
          API Docs
        </Button>
      </Link>
    </nav>
  )
}
