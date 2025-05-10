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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const customer = customers.find((c) => c.id === params.id)

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  // In a real app, this would fetch from a database
  return NextResponse.json(customer)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const customerIndex = customers.findIndex((c) => c.id === params.id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // In a real app, this would update the database
    const updatedCustomer = {
      ...customers[customerIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // For demo purposes, we'll just return the updated customer
    return NextResponse.json(updatedCustomer)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const customerIndex = customers.findIndex((c) => c.id === params.id)

  if (customerIndex === -1) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  // In a real app, this would delete from the database

  return NextResponse.json({
    success: true,
    message: "Customer deleted successfully",
  })
}
