import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { campaignId: string } }) {
  // In a real app, this would fetch from a database

  // For demo purposes, we'll return mock data
  const campaignId = params.campaignId

  // Generate random stats
  const total = 1000
  const delivered = Math.floor(total * 0.9) // 90% delivery rate
  const failed = total - delivered

  return NextResponse.json({
    campaignId,
    stats: {
      total,
      delivered,
      failed,
      deliveryRate: (delivered / total) * 100,
    },
    receipts: [
      {
        messageId: "msg_123",
        customerId: "cust_789",
        customerName: "John Doe",
        status: "DELIVERED",
        timestamp: "2023-06-01T18:30:00Z",
      },
      {
        messageId: "msg_124",
        customerId: "cust_790",
        customerName: "Jane Smith",
        status: "DELIVERED",
        timestamp: "2023-06-01T18:31:00Z",
      },
      {
        messageId: "msg_125",
        customerId: "cust_791",
        customerName: "Bob Johnson",
        status: "FAILED",
        timestamp: "2023-06-01T18:32:00Z",
      },
    ],
    pagination: {
      total,
      page: 1,
      limit: 10,
    },
  })
}
