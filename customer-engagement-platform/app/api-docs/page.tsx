import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApiEndpoint from "@/components/api-endpoint"

// Mock user for testing without authentication
const mockUser = {
  name: "Test User",
  email: "test@example.com",
  image: "/placeholder.svg?height=32&width=32",
}

export default async function ApiDocsPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">API Documentation</h1>
            <p className="text-muted-foreground">Integrate with our platform using our REST APIs.</p>
          </div>
          <div className="mt-6">
            <Tabs defaultValue="customers">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="customers">Customers API</TabsTrigger>
                <TabsTrigger value="orders">Orders API</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Receipt API</TabsTrigger>
              </TabsList>
              <TabsContent value="customers" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customers API</CardTitle>
                    <CardDescription>Manage customer data in the platform.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ApiEndpoint
                      method="GET"
                      endpoint="/api/customers"
                      description="Get all customers"
                      response={`{
  "customers": [
    {
      "id": "cust_123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "totalSpend": 1250.50,
      "totalOrders": 5,
      "lastOrderDate": "2023-05-15T10:30:00Z",
      "createdAt": "2023-01-10T08:15:00Z"
    },
    // ...more customers
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10
  }
}`}
                    />

                    <ApiEndpoint
                      method="POST"
                      endpoint="/api/customers"
                      description="Create a new customer"
                      request={`{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1987654321"
}`}
                      response={`{
  "id": "cust_456",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1987654321",
  "totalSpend": 0,
  "totalOrders": 0,
  "createdAt": "2023-06-01T14:22:00Z"
}`}
                    />

                    <ApiEndpoint
                      method="GET"
                      endpoint="/api/customers/:id"
                      description="Get a specific customer"
                      response={`{
  "id": "cust_123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "totalSpend": 1250.50,
  "totalOrders": 5,
  "lastOrderDate": "2023-05-15T10:30:00Z",
  "createdAt": "2023-01-10T08:15:00Z",
  "orders": [
    {
      "id": "ord_789",
      "amount": 350.25,
      "date": "2023-05-15T10:30:00Z",
      "status": "completed"
    },
    // ...more orders
  ]
}`}
                    />

                    <ApiEndpoint
                      method="PUT"
                      endpoint="/api/customers/:id"
                      description="Update a customer"
                      request={`{
  "name": "John Doe Jr.",
  "phone": "+1234567899"
}`}
                      response={`{
  "id": "cust_123",
  "name": "John Doe Jr.",
  "email": "john@example.com",
  "phone": "+1234567899",
  "totalSpend": 1250.50,
  "totalOrders": 5,
  "lastOrderDate": "2023-05-15T10:30:00Z",
  "updatedAt": "2023-06-01T15:10:00Z",
  "createdAt": "2023-01-10T08:15:00Z"
}`}
                    />

                    <ApiEndpoint
                      method="DELETE"
                      endpoint="/api/customers/:id"
                      description="Delete a customer"
                      response={`{
  "success": true,
  "message": "Customer deleted successfully"
}`}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders API</CardTitle>
                    <CardDescription>Manage order data in the platform.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ApiEndpoint
                      method="GET"
                      endpoint="/api/orders"
                      description="Get all orders"
                      response={`{
  "orders": [
    {
      "id": "ord_789",
      "customerId": "cust_123",
      "amount": 350.25,
      "items": [
        {
          "id": "item_001",
          "name": "Product A",
          "quantity": 2,
          "price": 125.50
        },
        {
          "id": "item_002",
          "name": "Product B",
          "quantity": 1,
          "price": 99.25
        }
      ],
      "status": "completed",
      "createdAt": "2023-05-15T10:30:00Z"
    },
    // ...more orders
  ],
  "pagination": {
    "total": 250,
    "page": 1,
    "limit": 10
  }
}`}
                    />

                    <ApiEndpoint
                      method="POST"
                      endpoint="/api/orders"
                      description="Create a new order"
                      request={`{
  "customerId": "cust_123",
  "items": [
    {
      "id": "item_001",
      "quantity": 2
    },
    {
      "id": "item_002",
      "quantity": 1
    }
  ]
}`}
                      response={`{
  "id": "ord_790",
  "customerId": "cust_123",
  "amount": 350.25,
  "items": [
    {
      "id": "item_001",
      "name": "Product A",
      "quantity": 2,
      "price": 125.50
    },
    {
      "id": "item_002",
      "name": "Product B",
      "quantity": 1,
      "price": 99.25
    }
  ],
  "status": "pending",
  "createdAt": "2023-06-01T16:45:00Z"
}`}
                    />

                    <ApiEndpoint
                      method="GET"
                      endpoint="/api/orders/:id"
                      description="Get a specific order"
                      response={`{
  "id": "ord_789",
  "customerId": "cust_123",
  "customerName": "John Doe",
  "amount": 350.25,
  "items": [
    {
      "id": "item_001",
      "name": "Product A",
      "quantity": 2,
      "price": 125.50
    },
    {
      "id": "item_002",
      "name": "Product B",
      "quantity": 1,
      "price": 99.25
    }
  ],
  "status": "completed",
  "createdAt": "2023-05-15T10:30:00Z"
}`}
                    />

                    <ApiEndpoint
                      method="PUT"
                      endpoint="/api/orders/:id"
                      description="Update an order status"
                      request={`{
  "status": "shipped"
}`}
                      response={`{
  "id": "ord_789",
  "status": "shipped",
  "updatedAt": "2023-06-01T17:20:00Z"
}`}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="delivery" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Receipt API</CardTitle>
                    <CardDescription>Handle delivery receipts from messaging vendors.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ApiEndpoint
                      method="POST"
                      endpoint="/api/delivery-receipts"
                      description="Record a delivery receipt"
                      request={`{
  "messageId": "msg_123",
  "campaignId": "camp_456",
  "customerId": "cust_789",
  "status": "DELIVERED",
  "timestamp": "2023-06-01T18:30:00Z"
}`}
                      response={`{
  "success": true,
  "messageId": "msg_123",
  "status": "DELIVERED"
}`}
                    />

                    <ApiEndpoint
                      method="GET"
                      endpoint="/api/delivery-receipts/campaign/:campaignId"
                      description="Get delivery stats for a campaign"
                      response={`{
  "campaignId": "camp_456",
  "stats": {
    "total": 1000,
    "delivered": 900,
    "failed": 100,
    "deliveryRate": 90
  },
  "receipts": [
    {
      "messageId": "msg_123",
      "customerId": "cust_789",
      "customerName": "John Doe",
      "status": "DELIVERED",
      "timestamp": "2023-06-01T18:30:00Z"
    },
    // ...more receipts
  ],
  "pagination": {
    "total": 1000,
    "page": 1,
    "limit": 10
  }
}`}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
