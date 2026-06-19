"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  Laptop,
  Key,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UttaraUniversityBadge } from "./UttaraUniversityBadge";
import { UTTARA_UNIVERSITY } from "@/constants/university";
import { fadeUp } from "./motion";

const heroFeatures = [
  { icon: Sparkles, label: "Smart matching" },
  { icon: ShieldCheck, label: "Verified claims" },
  { icon: Search, label: "Search by building" },
];

const floatingCards = [
  {
    icon: Wallet,
    title: "Brown Wallet",
    location: "Central Library",
    status: "Found",
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    className: "left-[6%] top-[22%] hidden xl:flex",
    delay: 0,
  },
  {
    icon: IdCard,
    title: "Student ID Card",
    location: "Cafeteria",
    status: "Lost",
    statusColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    className: "right-[8%] top-[26%] hidden xl:flex",
    delay: 0.15,
  },
  {
    icon: Laptop,
    title: "Silver Laptop",
    location: "Engineering Building",
    status: "Matched",
    statusColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    className: "left-[10%] bottom-[18%] hidden xl:flex",
    delay: 0.3,
  },
  {
    icon: Key,
    title: "Key Bundle",
    location: "Computer Lab Complex",
    status: "Found",
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    className: "right-[6%] bottom-[16%] hidden xl:flex",
    delay: 0.45,
  },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background pb-24 pt-12 selection:bg-cyan-500/30 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),rgba(34,211,238,0.05),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + card.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${card.className} w-56 flex-col gap-3 rounded-xl border border-border/50 bg-neutral-900/40 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-colors hover:border-blue-500/30 group dark:bg-black/40`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + card.delay * 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-secondary/50 text-foreground/80 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-400">
                <card.icon className="h-4 w-4" />
              </div>
              <Badge className={`border bg-transparent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${card.statusColor}`}>
                {card.status}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium tracking-tight text-foreground">{card.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{card.location}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 flex justify-center"
        >
          <UttaraUniversityBadge />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Lost something on campus?{" "}
          <span className="mt-1 block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            Get it back with LostX.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed tracking-tight text-muted-foreground sm:text-lg"
        >
          {UTTARA_UNIVERSITY.description} Report what you lost or found, browse listings by
          building, and claim items safely — no more digging through Facebook groups or notice
          boards.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 w-full rounded-xl bg-foreground px-8 font-medium text-background shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] sm:w-auto"
            asChild
          >
            <Link href="/dashboard/lost/new">
              I lost something
              <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-xl border-border px-8 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 active:scale-[0.98] sm:w-auto"
            asChild
          >
            <Link href="/dashboard/found/new">I found something</Link>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="h-12 w-full rounded-xl px-8 sm:w-auto"
            asChild
          >
            <Link href="/browse">Browse items</Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {heroFeatures.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl border border-border/40 bg-secondary/20 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-border dark:bg-neutral-900/30"
            >
              <Icon className="h-3.5 w-3.5 text-blue-500 dark:text-cyan-400" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
