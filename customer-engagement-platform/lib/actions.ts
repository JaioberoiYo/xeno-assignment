"use server"

import { revalidatePath } from "next/cache"
import { publishMessage } from "@/lib/queue"
import { createCampaign as dbCreateCampaign } from "@/lib/campaigns"
import type { Campaign } from "@/types/campaign"

export async function createCampaign(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const message = formData.get("message") as string
    const audienceSize = Number.parseInt(formData.get("audienceSize") as string)
    const rules = JSON.parse(formData.get("rules") as string)

    // Generate a campaign ID
    const campaignId = `camp_${Date.now()}`

    // Create campaign in database
    const campaignData: Omit<Campaign, 'id' | 'createdAt'> = {
      name,
      audienceSize,
      sent: 0, // Initially 0 as the campaign is just created
      failed: 0, // Initially 0 as the campaign is just created
      status: "DRAFT", // Initial status
    };
    
    const campaign = await dbCreateCampaign(campaignData);
    
    if (!campaign) {
      throw new Error("Failed to create campaign in database");
    }

    // Publish message to queue for async processing
    await publishMessage({
      type: "CAMPAIGN_CREATED",
      payload: {
        campaignId: campaign.id,
        name,
        message,
        audienceSize,
        rules,
        createdAt: campaign.createdAt,
      },
    })

    revalidatePath("/campaigns")

    return {
      success: true,
      message: "Campaign created successfully",
      campaignId: campaign.id,
    }
  } catch (error) {
    console.error("Error creating campaign:", error)
    return {
      success: false,
      message: "Failed to create campaign",
    }
  }
}
