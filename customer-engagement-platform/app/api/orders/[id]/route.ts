import { type NextRequest, NextResponse } from "next/server"

// Mock database for demo purposes
const orders = [
  {
    id: "ord_789",
    customerId: "cust_123",
    customerName: "John Doe",
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  // In a real app, this would fetch from a database
  return NextResponse.json(order)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const orderIndex = orders.findIndex((o) => o.id === params.id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // In a real app, this would update the database
    // Here we only allow updating the status
    const updatedOrder = {
      id: params.id,
      status: body.status,
      updatedAt: new Date().toISOString(),
    }

    // For demo purposes, we'll just return the updated order info
    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
