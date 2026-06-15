import Link from "next/link";
import { Sparkles } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="font-bold">LostX</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            AI-powered university lost & found platform.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="/browse" className="text-muted-foreground hover:text-foreground">
            Browse Items
          </Link>
          <Link href="mailto:support@lostx.app" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LostX. All rights reserved.
      </div>
    </footer>
  );
}
