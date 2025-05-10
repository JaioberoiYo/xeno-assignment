import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Customer Engagement Platform</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {/* Direct link to dashboard instead of sign in */}
            <Link href="/dashboard">
              <Button>
                <LogIn className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Customer Engagement Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create targeted campaigns, segment your audience, and track delivery metrics all in one place.
                </p>
              </div>
              <div className="space-x-4">
                {/* Direct link to dashboard instead of sign in */}
                <Link href="/dashboard">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
