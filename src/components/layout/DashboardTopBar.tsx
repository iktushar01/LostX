"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/shared/modeToggle";
import { NotificationsMenu, type NotificationItem } from "./NotificationsMenu";

interface DashboardTopBarProps {
  notifications?: NotificationItem[];
}

export function DashboardTopBar({ notifications = [] }: DashboardTopBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("searchTerm", query.trim());
    router.push(`/browse${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1 md:hidden" />
      <Separator orientation="vertical" className="h-5 md:hidden" />

      <form onSubmit={handleSearch} className="relative flex-1 md:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lost & found items..."
          className="h-9 border-slate-200 bg-slate-50 pl-9 dark:border-slate-800 dark:bg-slate-900/50"
        />
      </form>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <NotificationsMenu notifications={notifications} />
        <ModeToggle variant="ghost" />
      </div>
    </header>
  );
}
