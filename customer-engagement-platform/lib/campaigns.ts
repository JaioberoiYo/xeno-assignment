// This is a mock implementation for demo purposes
// In a real application, this would fetch data from a database

import type { Campaign } from "@/types/campaign"
import { query } from "./db"

// Sample campaign data
const sampleCampaigns: Campaign[] = [
  {
    id: "camp_1",
    name: "Summer Sale Promotion",
    createdAt: "2023-05-15T10:30:00Z",
    audienceSize: 1250,
    sent: 1125,
    failed: 125,
    status: "COMPLETED",
  },
  {
    id: "camp_2",
    name: "New Product Launch",
    createdAt: "2023-05-20T14:45:00Z",
    audienceSize: 2500,
    sent: 2300,
    failed: 200,
    status: "COMPLETED",
  },
  {
    id: "camp_3",
    name: "Customer Reactivation",
    createdAt: "2023-05-25T09:15:00Z",
    audienceSize: 750,
    sent: 700,
    failed: 50,
    status: "COMPLETED",
  },
  {
    id: "camp_4",
    name: "Loyalty Program",
    createdAt: "2023-06-01T11:00:00Z",
    audienceSize: 500,
    sent: 450,
    failed: 50,
    status: "COMPLETED",
  },
  {
    id: "camp_5",
    name: "Flash Sale Announcement",
    createdAt: "2023-06-05T16:30:00Z",
    audienceSize: 1800,
    sent: 1620,
    failed: 180,
    status: "COMPLETED",
  },
]

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const rows = await query(`
      SELECT 
        id,
        name,
        created_at as createdAt,
        audience_size as audienceSize,
        sent,
        failed,
        status
      FROM campaigns
      ORDER BY created_at DESC
    `);
    
    // Convert the MySQL rows to our Campaign type
    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      createdAt: new Date(row.createdAt).toISOString(),
      audienceSize: row.audienceSize,
      sent: row.sent,
      failed: row.failed,
      status: row.status
    }));
  } catch (error) {
    console.error('Error fetching campaigns from database:', error);
    return [];
  }
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  try {
    const rows = await query(`
      SELECT 
        id,
        name,
        created_at as createdAt,
        audience_size as audienceSize,
        sent,
        failed,
        status
      FROM campaigns
      WHERE id = ?
    `, [id]);
    
    if (!rows || (rows as any[]).length === 0) {
      return null;
    }
    
    const row = (rows as any[])[0];
    
    return {
      id: row.id,
      name: row.name,
      createdAt: new Date(row.createdAt).toISOString(),
      audienceSize: row.audienceSize,
      sent: row.sent,
      failed: row.failed,
      status: row.status
    };
  } catch (error) {
    console.error(`Error fetching campaign ${id} from database:`, error);
    return null;
  }
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt'>): Promise<Campaign | null> {
  try {
    const id = `camp_${Date.now()}`;
    
    await query(`
      INSERT INTO campaigns (
        id,
        name,
        audience_size,
        sent,
        failed,
        status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      id,
      campaign.name,
      campaign.audienceSize,
      campaign.sent,
      campaign.failed,
      campaign.status
    ]);
    
    // Return the newly created campaign
    return getCampaign(id);
  } catch (error) {
    console.error('Error creating campaign in database:', error);
    return null;
  }
}
