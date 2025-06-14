"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="font-bold">Customer Engagement Platform</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={pathname === "/dashboard" ? "font-bold" : ""}
            >
              Dashboard
            </Link>
            <Link
              href="/campaigns"
              onClick={() => setOpen(false)}
              className={pathname.startsWith("/campaigns") ? "font-bold" : ""}
            >
              Campaigns
            </Link>
            <Link
              href="/customers"
              onClick={() => setOpen(false)}
              className={pathname === "/customers" ? "font-bold" : ""}
            >
              Customers
            </Link>
            <Link
              href="/api-docs"
              onClick={() => setOpen(false)}
              className={pathname === "/api-docs" ? "font-bold" : ""}
            >
              API Docs
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
