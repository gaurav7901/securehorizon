
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Bell, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [showSearch, setShowSearch] = React.useState(false);
  
  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center gap-2 md:gap-4 border-b bg-background px-3 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={onMenuClick}>
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      {showSearch ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search security findings..."
            className="h-8 md:h-9 flex-1 text-sm"
            autoFocus
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9" onClick={() => setShowSearch(false)}>
            <X className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      ) : (
        <>
          <h2 className="font-semibold hidden lg:block text-sm md:text-base">Dashboard</h2>
          <div className="flex-1" />
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9" onClick={() => setShowSearch(true)}>
              <Search className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-9 md:w-9">
            <Bell className="h-3 w-3 md:h-4 md:w-4" />
            <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 md:w-80">
          <DropdownMenuLabel className="text-sm">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-60 md:max-h-80 overflow-y-auto">
            {[
              "New high severity finding detected in S3 buckets",
              "IAM policy alert: Overly permissive admin rights",
              "GuardDuty finding: Unusual API activity detected",
              "5 open security findings require attention",
              "Weekly security report generated"
            ].map((notification, index) => (
              <DropdownMenuItem key={index} className="flex items-start py-2 px-4 cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 mr-2 shrink-0" />
                <span className="text-sm">{notification}</span>
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center text-center">
            <span className="text-sm font-medium text-primary">View all notifications</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-7 w-7 md:h-8 md:w-8 rounded-full">
            <Avatar className="h-7 w-7 md:h-8 md:w-8">
              <AvatarImage src="" alt="User avatar" />
              <AvatarFallback className="text-xs">SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-sm">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/" className="text-sm">Log out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
