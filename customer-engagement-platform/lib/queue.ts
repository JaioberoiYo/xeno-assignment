// This is a simplified implementation of a message queue
// In a real application, you would use Redis, RabbitMQ, Kafka, etc.

import { query } from "@/lib/db"
import { revalidatePath } from "next/cache"

type QueueMessage = {
  type: string
  payload: any
}

// In-memory queue for demo purposes
const messageQueue: QueueMessage[] = []

// Simulated consumer that processes messages
let consumerRunning = false

export async function publishMessage(message: QueueMessage): Promise<void> {
  // Add message to queue
  messageQueue.push(message)
  console.log(`Message published to queue: ${message.type}`)

  // Start consumer if not already running
  if (!consumerRunning) {
    startConsumer()
  }

  return Promise.resolve()
}

function startConsumer() {
  consumerRunning = true

  // Process queue every 2 seconds
  const intervalId = setInterval(async () => {
    if (messageQueue.length === 0) {
      clearInterval(intervalId)
      consumerRunning = false
      return
    }

    const message = messageQueue.shift()
    if (!message) return

    console.log(`Processing message: ${message.type}`)

    try {
      await processMessage(message)
      console.log(`Message processed successfully: ${message.type}`)
    } catch (error) {
      console.error(`Error processing message: ${message.type}`, error)
      // In a real system, you might implement retry logic or dead-letter queue
    }
  }, 2000)
}

async function processMessage(message: QueueMessage): Promise<void> {
  switch (message.type) {
    case "CAMPAIGN_CREATED":
      await processCampaign(message.payload)
      break
    default:
      console.warn(`Unknown message type: ${message.type}`)
  }
}

async function processCampaign(campaign: any): Promise<void> {
  // In a real application, this would:
  // 1. Query the database for customers matching the segment rules
  // 2. Send messages to each customer via the messaging vendor
  // 3. Update the campaign status and delivery stats

  // For demo purposes, we'll simulate this with random success/failure rates
  const { audienceSize, campaignId } = campaign

  // Update campaign status to SENDING
  await updateCampaignStatus(campaignId, "SENDING");

  // Simulate processing time (1-3 seconds)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

  // Simulate 90% success rate
  const successRate = 0.9
  const successCount = Math.floor(audienceSize * successRate)
  const failureCount = audienceSize - successCount

  // Update campaign stats in the database
  await updateCampaignStats(campaignId, successCount, failureCount);

  console.log(`Campaign ${campaignId} processed:`)
  console.log(`- Total audience: ${audienceSize}`)
  console.log(`- Successfully delivered: ${successCount}`)
  console.log(`- Failed deliveries: ${failureCount}`)

  // Revalidate the campaigns page to show updated data
  revalidatePath("/campaigns");
}

async function updateCampaignStatus(campaignId: string, status: string): Promise<void> {
  try {
    await query(
      `UPDATE campaigns SET status = ? WHERE id = ?`,
      [status, campaignId]
    );
  } catch (error) {
    console.error(`Error updating campaign status:`, error);
  }
}

async function updateCampaignStats(campaignId: string, sent: number, failed: number): Promise<void> {
  try {
    await query(
      `UPDATE campaigns SET sent = ?, failed = ?, status = 'COMPLETED' WHERE id = ?`,
      [sent, failed, campaignId]
    );
  } catch (error) {
    console.error(`Error updating campaign stats:`, error);
  }
}
