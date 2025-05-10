export type CampaignStatus = "DRAFT" | "SENDING" | "PROCESSING" | "COMPLETED" | "FAILED"

export interface Campaign {
  id: string
  name: string
  createdAt: string
  audienceSize: number
  sent: number
  failed: number
  status: CampaignStatus
}
