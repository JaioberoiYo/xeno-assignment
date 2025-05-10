"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Campaign } from "@/types/campaign"
import { useRouter } from "next/navigation"

interface CampaignListProps {
  campaigns: Campaign[]
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  const router = useRouter();
  const [sortedCampaigns, setSortedCampaigns] = useState<Campaign[]>(() => {
    return [...campaigns].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Check if any campaigns are in SENDING status
  const hasSendingCampaigns = sortedCampaigns.some(campaign => campaign.status === "SENDING");
  
  // Auto-refresh if there are campaigns in SENDING status
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (hasSendingCampaigns) {
      intervalId = setInterval(() => {
        router.refresh();
      }, 5000); // Refresh every 5 seconds
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [hasSendingCampaigns, router]);
  
  // Update sorted campaigns when props change
  useEffect(() => {
    setSortedCampaigns([...campaigns].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }));
  }, [campaigns]);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="rounded-md border">
      <div className="flex justify-end p-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Audience Size</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Failed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCampaigns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No campaigns found. Create your first campaign!
              </TableCell>
            </TableRow>
          ) : (
            sortedCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(campaign.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>{campaign.audienceSize}</TableCell>
                <TableCell>{campaign.sent}</TableCell>
                <TableCell>{campaign.failed}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "COMPLETED"
                        ? "success"
                        : campaign.status === "SENDING" || campaign.status === "PROCESSING"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          // View campaign details
                        }}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          // Duplicate campaign
                        }}
                      >
                        Duplicate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
