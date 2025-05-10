"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Operator = "AND" | "OR"
type Condition = {
  id: string
  field: string
  operator: string
  value: string
}
type RuleGroup = {
  id: string
  operator: Operator
  conditions: Condition[]
}

interface RuleBuilderProps {
  createCampaign: (formData: FormData) => Promise<{ success: boolean; message: string; campaignId?: string }>
}

export default function RuleBuilder({ createCampaign }: RuleBuilderProps) {
  const [campaignName, setCampaignName] = useState("")
  const [message, setMessage] = useState("")
  const [audienceSize, setAudienceSize] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([
    {
      id: "group-1",
      operator: "AND",
      conditions: [
        {
          id: "condition-1",
          field: "spend",
          operator: ">",
          value: "",
        },
      ],
    },
  ])

  const { toast } = useToast()
  const router = useRouter()

  const fieldOptions = [
    { value: "spend", label: "Total Spend" },
    { value: "visits", label: "Number of Visits" },
    { value: "last_order", label: "Days Since Last Order" },
    { value: "orders", label: "Number of Orders" },
    { value: "avg_order_value", label: "Average Order Value" },
  ]

  const operatorOptions = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: "=", label: "Equal to" },
    { value: ">=", label: "Greater than or equal to" },
    { value: "<=", label: "Less than or equal to" },
    { value: "!=", label: "Not equal to" },
  ]

  const addRuleGroup = () => {
    const newGroup: RuleGroup = {
      id: `group-${ruleGroups.length + 1}-${Date.now()}`,
      operator: "AND",
      conditions: [
        {
          id: `condition-${Date.now()}`,
          field: "spend",
          operator: ">",
          value: "",
        },
      ],
    }
    setRuleGroups([...ruleGroups, newGroup])
  }

  const removeRuleGroup = (groupId: string) => {
    if (ruleGroups.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one rule group.",
        variant: "destructive",
      })
      return
    }
    setRuleGroups(ruleGroups.filter((group) => group.id !== groupId))
  }

  const addCondition = (groupId: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            conditions: [
              ...group.conditions,
              {
                id: `condition-${Date.now()}`,
                field: "spend",
                operator: ">",
                value: "",
              },
            ],
          }
        }
        return group
      }),
    )
  }

  const removeCondition = (groupId: string, conditionId: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          if (group.conditions.length === 1) {
            toast({
              title: "Cannot remove",
              description: "Each group needs at least one condition.",
              variant: "destructive",
            })
            return group
          }
          return {
            ...group,
            conditions: group.conditions.filter((condition) => condition.id !== conditionId),
          }
        }
        return group
      }),
    )
  }

  const updateCondition = (groupId: string, conditionId: string, field: keyof Condition, value: string) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            conditions: group.conditions.map((condition) => {
              if (condition.id === conditionId) {
                return {
                  ...condition,
                  [field]: value,
                }
              }
              return condition
            }),
          }
        }
        return group
      }),
    )
  }

  const updateGroupOperator = (groupId: string, operator: Operator) => {
    setRuleGroups(
      ruleGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            operator,
          }
        }
        return group
      }),
    )
  }

  const calculateAudienceSize = async () => {
    // Validate rules
    let isValid = true
    ruleGroups.forEach((group) => {
      group.conditions.forEach((condition) => {
        if (!condition.value) {
          isValid = false
        }
      })
    })

    if (!isValid) {
      toast({
        title: "Incomplete rules",
        description: "Please fill in all condition values.",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)

    try {
      // In a real app, this would be an API call to calculate audience size
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Random audience size between 100 and 5000
      const size = Math.floor(Math.random() * 4900) + 100
      setAudienceSize(size)

      toast({
        title: "Audience calculated",
        description: `Your segment contains ${size} customers.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate audience size.",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!campaignName) {
      toast({
        title: "Missing campaign name",
        description: "Please provide a name for your campaign.",
        variant: "destructive",
      })
      return
    }

    if (!message) {
      toast({
        title: "Missing message",
        description: "Please provide a message for your campaign.",
        variant: "destructive",
      })
      return
    }

    if (audienceSize === null) {
      toast({
        title: "Calculate audience first",
        description: "Please calculate your audience size before creating the campaign.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", campaignName)
      formData.append("message", message)
      formData.append("audienceSize", audienceSize.toString())
      formData.append("rules", JSON.stringify(ruleGroups))

      const result = await createCampaign(formData)

      if (result.success) {
        toast({
          title: "Campaign created",
          description: "Your campaign has been created successfully.",
        })
        router.push("/campaigns")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create campaign.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid gap-3">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="message">Message Template</Label>
          <Input
            id="message"
            placeholder="Hi {name}, here's 10% off on your next order!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <p className="text-sm text-muted-foreground">
            Use {"{name}"} to personalize the message with customer's name.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Audience Rules</h3>
            <Button type="button" variant="outline" size="sm" onClick={addRuleGroup}>
              <Plus className="mr-2 h-4 w-4" />
              Add Rule Group
            </Button>
          </div>

          <div className="space-y-4">
            {ruleGroups.map((group, groupIndex) => (
              <Card key={group.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Rule Group {groupIndex + 1}</CardTitle>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeRuleGroup(group.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.conditions.map((condition) => (
                      <div key={condition.id} className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-4">
                          <Select
                            value={condition.field}
                            onValueChange={(value) => updateCondition(group.id, condition.id, "field", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Select
                            value={condition.operator}
                            onValueChange={(value) => updateCondition(group.id, condition.id, "operator", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              {operatorOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-4">
                          <Input
                            type="text"
                            placeholder="Value"
                            value={condition.value}
                            onChange={(e) => updateCondition(group.id, condition.id, "value", e.target.value)}
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCondition(group.id, condition.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-3">
                  <div className="flex items-center">
                    <p className="text-sm font-medium mr-2">Conditions match:</p>
                    <Select
                      value={group.operator}
                      onValueChange={(value) => updateGroupOperator(group.id, value as Operator)}
                    >
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">ALL (AND)</SelectItem>
                        <SelectItem value="OR">ANY (OR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => addCondition(group.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Condition
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {audienceSize !== null && (
              <div className="text-sm">
                <span className="font-medium">Estimated audience size:</span> {audienceSize.toLocaleString()} customers
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={calculateAudienceSize} disabled={isCalculating}>
              {isCalculating ? "Calculating..." : "Calculate Audience Size"}
            </Button>
            <Button type="submit" disabled={isSubmitting || audienceSize === null}>
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
