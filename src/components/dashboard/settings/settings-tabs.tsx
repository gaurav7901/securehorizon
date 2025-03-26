
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="admin@securityapp.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" defaultValue="Acme Corporation" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc-8">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-12">UTC-12:00</SelectItem>
                  <SelectItem value="utc-11">UTC-11:00</SelectItem>
                  <SelectItem value="utc-10">UTC-10:00</SelectItem>
                  <SelectItem value="utc-9">UTC-09:00</SelectItem>
                  <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                  <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                  <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                  <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                  <SelectItem value="utc-4">UTC-04:00</SelectItem>
                  <SelectItem value="utc-3">UTC-03:00</SelectItem>
                  <SelectItem value="utc-2">UTC-02:00</SelectItem>
                  <SelectItem value="utc-1">UTC-01:00</SelectItem>
                  <SelectItem value="utc">UTC+00:00</SelectItem>
                  <SelectItem value="utc+1">UTC+01:00</SelectItem>
                  <SelectItem value="utc+2">UTC+02:00</SelectItem>
                  <SelectItem value="utc+3">UTC+03:00</SelectItem>
                  <SelectItem value="utc+4">UTC+04:00</SelectItem>
                  <SelectItem value="utc+5">UTC+05:00</SelectItem>
                  <SelectItem value="utc+5.5">UTC+05:30</SelectItem>
                  <SelectItem value="utc+6">UTC+06:00</SelectItem>
                  <SelectItem value="utc+7">UTC+07:00</SelectItem>
                  <SelectItem value="utc+8">UTC+08:00</SelectItem>
                  <SelectItem value="utc+9">UTC+09:00</SelectItem>
                  <SelectItem value="utc+10">UTC+10:00</SelectItem>
                  <SelectItem value="utc+11">UTC+11:00</SelectItem>
                  <SelectItem value="utc+12">UTC+12:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark mode for the dashboard
                </p>
              </div>
              <Switch id="dark-mode" defaultChecked={true} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive critical security alerts via email
                </p>
              </div>
              <Switch id="email-alerts" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="sms-alerts">SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive critical security alerts via SMS
                </p>
              </div>
              <Switch id="sms-alerts" defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-summary">Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of security events
                </p>
              </div>
              <Switch id="weekly-summary" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="scan-notifications">Scan Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when scans complete
                </p>
              </div>
              <Switch id="scan-notifications" defaultChecked={true} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input id="notification-email" defaultValue="alerts@acmecorp.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage account security and authentication options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require a second form of authentication when logging in
                </p>
              </div>
              <Switch id="two-factor" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after period of inactivity
                </p>
              </div>
              <Switch id="session-timeout" defaultChecked={true} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session-duration">Session Duration</Label>
              <Select defaultValue="60">
                <SelectTrigger id="session-duration">
                  <SelectValue placeholder="Select timeout period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="240">4 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4">
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="advanced">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced security and system options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex space-x-2">
                <Input id="api-key" defaultValue="sk_live_7n3rGk29Jx8z5Qw1LmP0bY6t" type="password" />
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This API key provides full access to your account. Keep it secure.
              </p>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md">
              <div className="space-y-0.5">
                <Label htmlFor="auto-scan">Automatic Scanning</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically run security scans on a schedule
                </p>
              </div>
              <Switch id="auto-scan" defaultChecked={true} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scan-frequency">Scan Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="scan-frequency">
                  <SelectValue placeholder="Select scan frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention Period</Label>
              <Select defaultValue="90">
                <SelectTrigger id="data-retention">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="730">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button variant="destructive" className="w-full">
                Reset All Settings
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This will reset all settings to their default values. This action cannot be undone.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
