
export interface Finding {
  id: string;
  title: string;
  description: string;
  service: string;
  resourceId: string;
  severity: string;
  status: string;
  timestamp: string;
}

export interface CloudTrailEventDetails {
  sourceIPAddress?: string;
  eventTime?: string;
  eventSource?: string;
  [key: string]: any; // Allow other properties
}
