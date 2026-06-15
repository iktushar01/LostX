"use client";

import { syncAuthUserAction } from "@/actions/authActions/_syncAuthUserAction";
import { logoutAction } from "@/components/modules/HomePage/_logoutAction";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { LayoutDashboard, Loader2, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserFromCookie } from "@/types/auth.types";
import { cn } from "@/lib/utils";

interface NavbarAuthMenuProps {
  variant?: "landing" | "default";
  mobile?: boolean;
  onNavigate?: () => void;
  className?: string;
}

function getDashboardHref(role?: string) {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return "/admin";
  }
  return "/dashboard";
}

export function NavbarAuthMenu({
  variant = "default",
  mobile = false,
  onNavigate,
  className,
}: NavbarAuthMenuProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const [user, setUser] = useState<UserFromCookie | null>(() => {
    const userCookie = getCookie("user");
    if (!userCookie) return null;

    try {
      return JSON.parse(userCookie as string) as UserFromCookie;
    } catch {
      return null;
    }
  });

  const { data: syncedUser } = useQuery({
    queryKey: ["auth-user-sync"],
    queryFn: syncAuthUserAction,
    enabled: !user,
    staleTime: 60_000,
    retry: false,
  });

  const resolvedUser =
    user ?? (syncedUser?.success && syncedUser.data ? syncedUser.data : null);

  const { mutate: handleLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutAction,
    onSettled: () => {
      deleteCookie("user");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("better-auth.session_token");
      deleteCookie("better-auth.session_data");
      setUser(null);
      setIsLogoutDialogOpen(false);
      onNavigate?.();
      window.location.assign("/");
    },
  });

  const clearSession = () => {
    setIsLogoutDialogOpen(true);
  };

  if (!resolvedUser) {
    if (mobile) {
      return (
        <div className={cn("flex flex-col gap-2", className)}>
          <Button variant="outline" asChild onClick={onNavigate}>
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className={
              variant === "landing"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                : undefined
            }
            asChild
            onClick={onNavigate}
          >
            <Link href="/register">
              {variant === "landing" ? "Get Started" : "Sign Up"}
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button
          size="sm"
          asChild
          className={
            variant === "landing"
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 hover:opacity-90"
              : "h-9 rounded-lg px-4 font-semibold shadow-sm"
          }
        >
          <Link href="/register">
            {variant === "landing" ? "Get Started" : "Sign Up"}
          </Link>
        </Button>
      </div>
    );
  }

  const dashboardHref = getDashboardHref(resolvedUser.role);

  if (mobile) {
    return (
      <>
        <div className={cn("space-y-3 border-t border-border pt-3", className)}>
          <div className="flex items-center gap-3 px-1">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={resolvedUser.avatar ?? resolvedUser.image ?? undefined}
                alt={resolvedUser.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {resolvedUser.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{resolvedUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {resolvedUser.email}
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link href="/profile" onClick={onNavigate}>
              <User className="h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link href={dashboardHref} onClick={onNavigate}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start gap-2"
            onClick={clearSession}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Log out
          </Button>
        </div>
        <LogoutDialog
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
          isLoggingOut={isLoggingOut}
          onConfirm={() => handleLogout()}
        />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "relative h-9 w-9 rounded-full border border-border p-0",
              className,
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={resolvedUser.avatar ?? resolvedUser.image ?? undefined}
                alt={resolvedUser.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {resolvedUser.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 w-56 rounded-xl shadow-md" align="end">
          <DropdownMenuLabel className="p-2 font-normal">
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                {resolvedUser.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {resolvedUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg py-1.5" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg py-1.5" asChild>
              <Link href={dashboardHref}>
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={clearSession}
            disabled={isLoggingOut}
            className="cursor-pointer gap-2 rounded-lg py-1.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        isLoggingOut={isLoggingOut}
        onConfirm={() => handleLogout()}
      />
    </>
  );
}

function LogoutDialog({
  open,
  onOpenChange,
  isLoggingOut,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoggingOut: boolean;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-xl border border-border bg-background p-6 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold tracking-tight">
            Sign out?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-muted-foreground">
            You will be signed out of your account and returned to the home page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 sm:gap-2">
          <AlertDialogCancel disabled={isLoggingOut} className="h-10 rounded-lg font-medium">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
            disabled={isLoggingOut}
            className="h-10 rounded-lg bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoggingOut ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing out...
              </span>
            ) : (
              "Sign out"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
