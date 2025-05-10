import { type NextRequest, NextResponse } from "next/server"

// Mock database for demo purposes
const orders = [
  {
    id: "ord_789",
    customerId: "cust_123",
    amount: 350.25,
    items: [
      {
        id: "item_001",
        name: "Product A",
        quantity: 2,
        price: 125.5,
      },
      {
        id: "item_002",
        name: "Product B",
        quantity: 1,
        price: 99.25,
      },
    ],
    status: "completed",
    createdAt: "2023-05-15T10:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  // In a real app, this would fetch from a database
  // Add pagination, filtering, etc.

  return NextResponse.json({
    orders,
    pagination: {
      total: orders.length,
      page: 1,
      limit: 10,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.customerId || !body.items || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Customer ID and items array are required" }, { status: 400 })
    }

    // In a real app, this would:
    // 1. Validate the customer exists
    // 2. Validate the items exist and are in stock
    // 3. Calculate the total amount
    // 4. Save the order to the database

    // For demo purposes, we'll create a mock order
    const newOrder = {
      id: `ord_${Date.now()}`,
      customerId: body.customerId,
      amount: 350.25, // Mock amount
      items: body.items.map((item: any) => ({
        id: item.id,
        name: item.id === "item_001" ? "Product A" : "Product B", // Mock names
        quantity: item.quantity,
        price: item.id === "item_001" ? 125.5 : 99.25, // Mock prices
      })),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // For demo purposes, we'll just return the new order
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
