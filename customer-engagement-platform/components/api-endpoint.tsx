"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  request?: string
  response: string
}

export default function ApiEndpoint({ method, endpoint, description, request, response }: ApiEndpointProps) {
  const [expanded, setExpanded] = useState(false)
  const { toast } = useToast()

  const methodColors = {
    GET: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800",
    POST: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800",
    PUT: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800",
    DELETE: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    })
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center space-x-3">
          <Badge className={methodColors[method]} variant="outline">
            {method}
          </Badge>
          <span className="font-mono text-sm">{endpoint}</span>
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      {expanded && (
        <div className="border-t p-4 space-y-4">
          {request && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Request Body</h4>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(request)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                <code>{request}</code>
              </pre>
            </div>
          )}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Response</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(response)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
              <code>{response}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
