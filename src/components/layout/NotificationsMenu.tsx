"use client";

import Link from "next/link";
import { Bell, CheckCircle2, Clock, HandHelping, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  date: string;
  kind: "claim-approved" | "claim-pending" | "found" | "recovered";
};

const kindConfig = {
  "claim-approved": { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400" },
  "claim-pending": { icon: Clock, color: "text-amber-600 dark:text-amber-400" },
  found: { icon: PackageSearch, color: "text-blue-600 dark:text-blue-400" },
  recovered: { icon: HandHelping, color: "text-violet-600 dark:text-violet-400" },
};

interface NotificationsMenuProps {
  notifications: NotificationItem[];
}

export function NotificationsMenu({ notifications }: NotificationsMenuProps) {
  const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} new` : ""}`}
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
              {unreadCount} new
            </span>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Bell className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">You&apos;re all caught up</p>
            <p className="mt-1 text-xs text-muted-foreground">
              New activity on your items will show up here.
            </p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto py-1">
            {notifications.map((n) => {
              const config = kindConfig[n.kind];
              const Icon = config.icon;
              return (
                <Link
                  key={n.id}
                  href={n.href}
                  className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60 focus-visible:bg-muted focus-visible:outline-none"
                >
                  <div className={cn("mt-0.5 shrink-0", config.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.description}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/70">{n.date}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="border-t px-2 py-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs" asChild>
            <Link href="/claims">View all activity</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
