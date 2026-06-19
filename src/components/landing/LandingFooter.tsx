import Link from "next/link";
import Logo from "@/components/shared/logo/logo";
import { UttaraUniversityBadge } from "./UttaraUniversityBadge";
import { UTTARA_UNIVERSITY } from "@/constants/university";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <div className="mt-3">
            <UttaraUniversityBadge size="sm" />
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {UTTARA_UNIVERSITY.description}
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground">
            How it works
          </Link>
          <Link href="/browse" className="text-muted-foreground hover:text-foreground">
            Browse items
          </Link>
          <Link href="/register" className="text-muted-foreground hover:text-foreground">
            Sign up
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LostX · {UTTARA_UNIVERSITY.name}
      </div>
    </footer>
  );
}
