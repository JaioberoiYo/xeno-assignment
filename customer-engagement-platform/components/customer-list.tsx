"use client"

import { useState } from "react"
import type { Customer } from "@/types/customer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface CustomerListProps {
  customers: Customer[]
}

export default function CustomerList({ customers }: CustomerListProps) {
  const [sortColumn, setSortColumn] = useState<keyof Customer>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortedCustomers = [...customers].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === undefined || bValue === undefined) return 0

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleSort = (column: keyof Customer) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("totalSpend")}
              >
                Total Spend
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("totalOrders")}
              >
                Orders
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("lastOrderDate")}
              >
                Last Order
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.length > 0 ? (
              sortedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>${customer.totalSpend.toFixed(2)}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>
                    {customer.lastOrderDate 
                      ? formatDate(new Date(customer.lastOrderDate))
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 