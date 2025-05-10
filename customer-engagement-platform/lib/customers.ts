import type { Customer } from "@/types/customer"
import { query } from "./db"

export async function getCustomers(): Promise<Customer[]> {
  try {
    const rows = await query(`
      SELECT 
        id,
        name,
        email,
        phone,
        total_spend as totalSpend,
        total_orders as totalOrders,
        last_order_date as lastOrderDate,
        created_at as createdAt
      FROM customers
      ORDER BY name ASC
    `);
    
    // Convert the MySQL rows to our Customer type
    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      totalSpend: parseFloat(row.totalSpend) || 0,
      totalOrders: row.totalOrders || 0,
      lastOrderDate: row.lastOrderDate ? new Date(row.lastOrderDate).toISOString() : undefined,
      createdAt: new Date(row.createdAt).toISOString()
    }));
  } catch (error) {
    console.error('Error fetching customers from database:', error);
    return [];
  }
}

export async function getCustomer(id: string): Promise<Customer | null> {
  try {
    const rows = await query(`
      SELECT 
        id,
        name,
        email,
        phone,
        total_spend as totalSpend,
        total_orders as totalOrders,
        last_order_date as lastOrderDate,
        created_at as createdAt
      FROM customers
      WHERE id = ?
    `, [id]);
    
    if (!rows || (rows as any[]).length === 0) {
      return null;
    }
    
    const row = (rows as any[])[0];
    
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      totalSpend: parseFloat(row.totalSpend) || 0,
      totalOrders: row.totalOrders || 0,
      lastOrderDate: row.lastOrderDate ? new Date(row.lastOrderDate).toISOString() : undefined,
      createdAt: new Date(row.createdAt).toISOString()
    };
  } catch (error) {
    console.error(`Error fetching customer ${id} from database:`, error);
    return null;
  }
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'totalSpend' | 'totalOrders' | 'lastOrderDate'>): Promise<Customer | null> {
  try {
    const id = `cust_${Date.now()}`;
    
    await query(`
      INSERT INTO customers (
        id,
        name,
        email,
        phone
      ) VALUES (?, ?, ?, ?)
    `, [
      id,
      customer.name,
      customer.email,
      customer.phone || ''
    ]);
    
    // Return the newly created customer
    return getCustomer(id);
  } catch (error) {
    console.error('Error creating customer in database:', error);
    return null;
  }
} 