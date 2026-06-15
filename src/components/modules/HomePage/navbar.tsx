"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/shared/modeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/shared/logo/logo";
import { NavbarAuthMenu } from "@/components/shared/NavbarAuthMenu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/browse">Browse</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/lost">Lost</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/found">Found</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="mx-1 hidden h-4 w-px bg-border sm:block" />

          <div className="hidden sm:block">
            <NavbarAuthMenu />
          </div>

          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-1 w-56 rounded-xl p-2">
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                  <Link href="/browse">Browse</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                  <Link href="/dashboard/lost">Lost</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                  <Link href="/dashboard/found">Found</Link>
                </DropdownMenuItem>
                <div className="pt-2">
                  <NavbarAuthMenu mobile />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
