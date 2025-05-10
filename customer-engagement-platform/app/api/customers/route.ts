import { type NextRequest, NextResponse } from "next/server"

// Mock database for demo purposes
const customers = [
  {
    id: "cust_123",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    totalSpend: 1250.5,
    totalOrders: 5,
    lastOrderDate: "2023-05-15T10:30:00Z",
    createdAt: "2023-01-10T08:15:00Z",
  },
  {
    id: "cust_456",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    totalSpend: 850.75,
    totalOrders: 3,
    lastOrderDate: "2023-04-20T14:45:00Z",
    createdAt: "2023-02-15T09:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  // In a real app, this would fetch from a database
  // Add pagination, filtering, etc.

  return NextResponse.json({
    customers,
    pagination: {
      total: customers.length,
      page: 1,
      limit: 10,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // In a real app, this would save to a database
    const newCustomer = {
      id: `cust_${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      totalSpend: 0,
      totalOrders: 0,
      createdAt: new Date().toISOString(),
    }

    // For demo purposes, we'll just return the new customer
    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
