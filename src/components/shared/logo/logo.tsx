"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export const LOSTX_LOGO_LIGHT =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1781504063/lightLogo_ypo4ze.png";

export const LOSTX_LOGO_DARK =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1781504062/darkLogo_p9sxkc.png";

interface LogoProps {
  href?: string;
  className?: string;
  height?: number;
}

const Logo = ({ href = "/", className, height = 40 }: LogoProps) => {
  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={LOSTX_LOGO_LIGHT}
        alt="LostX"
        height={height}
        className="block h-auto w-auto max-h-10 dark:hidden"
      />
      <img
        src={LOSTX_LOGO_DARK}
        alt="LostX"
        height={height}
        className="hidden h-auto w-auto max-h-10 dark:block"
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
