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
import { fadeUp } from "./motion";

const heroFeatures = [
  { icon: Sparkles, label: "Smart Matching" },
  { icon: ShieldCheck, label: "Secure Claim Process" },
  { icon: Search, label: "Campus-Wide Search" },
];

const floatingCards = [
  {
    icon: Wallet,
    title: "Brown Wallet",
    location: "Library · 2nd Floor",
    status: "Found",
    className: "left-[8%] top-[18%] hidden lg:flex",
    delay: 0,
  },
  {
    icon: IdCard,
    title: "Student ID",
    location: "Cafeteria",
    status: "Lost",
    className: "right-[10%] top-[22%] hidden lg:flex",
    delay: 0.15,
  },
  {
    icon: Laptop,
    title: "MacBook Pro",
    location: "Engineering Block",
    status: "Matched",
    className: "left-[12%] bottom-[16%] hidden lg:flex",
    delay: 0.3,
  },
  {
    icon: Key,
    title: "Key Bundle",
    location: "Parking Lot B",
    status: "Found",
    className: "right-[8%] bottom-[14%] hidden lg:flex",
    delay: 0.45,
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl" />
        <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[radial-gradient(circle,rgba(100,116,139,0.12)_1px,transparent_1px)]" />
      </div>

      {/* Floating cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + card.delay, duration: 0.6 }}
          className={`absolute ${card.className} w-52 flex-col gap-2 rounded-2xl border border-white/20 bg-background/60 p-4 shadow-xl backdrop-blur-md`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + card.delay * 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 text-blue-600 dark:text-cyan-400">
              <card.icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold">{card.title}</p>
            <p className="text-xs text-muted-foreground">{card.location}</p>
            <Badge variant="secondary" className="w-fit text-[10px]">
              {card.status}
            </Badge>
          </motion.div>
        </motion.div>
      ))}

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium text-blue-700 dark:text-cyan-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered University Lost & Found
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Lost Something?{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Find It Faster.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          LostX helps students and staff recover lost items through smart matching,
          secure claims, and a centralized university platform.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 w-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-white shadow-lg shadow-blue-500/25 hover:opacity-90 sm:w-auto"
            asChild
          >
            <Link href="/dashboard/lost/new">
              Report Lost Item
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto" asChild>
            <Link href="/browse">Browse Found Items</Link>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {heroFeatures.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
