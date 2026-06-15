"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  height?: number;
}

const Logo = ({ href = "/", className, height = 32 }: LogoProps) => {
  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/logo-light.svg"
        alt="LostX"
        height={height}
        className="block w-auto dark:hidden"
      />
      <img
        src="/logo-dark.svg"
        alt="LostX"
        height={height}
        className="hidden w-auto dark:block"
      />
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
};

export default Logo;
