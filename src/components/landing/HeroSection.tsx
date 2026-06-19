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
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    className: "left-[6%] top-[22%] hidden xl:flex",
    delay: 0,
  },
  {
    icon: IdCard,
    title: "Student ID",
    location: "Cafeteria",
    status: "Lost",
    statusColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    className: "right-[8%] top-[26%] hidden xl:flex",
    delay: 0.15,
  },
  {
    icon: Laptop,
    title: "MacBook Pro",
    location: "Engineering Block",
    status: "Matched",
    statusColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    className: "left-[10%] bottom-[18%] hidden xl:flex",
    delay: 0.3,
  },
  {
    icon: Key,
    title: "Key Bundle",
    location: "Parking Lot B",
    status: "Found",
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    className: "right-[6%] bottom-[16%] hidden xl:flex",
    delay: 0.45,
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24 bg-background selection:bg-cyan-500/30">
      
      {/* GenZ Grid & Radial Gradient Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),rgba(34,211,238,0.05),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Modern High-Fidelity Floating Cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + card.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${card.className} w-56 flex-col gap-3 rounded-xl border border-border/50 bg-neutral-900/40 dark:bg-black/40 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-colors hover:border-blue-500/30 group`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + card.delay * 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 border border-border/80 text-foreground/80 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
                <card.icon className="h-4 w-4" />
              </div>
              <Badge className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 border bg-transparent ${card.statusColor}`}>
                {card.status}
              </Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium tracking-tight text-foreground">{card.title}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">{card.location}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        
        {/* Futuristic Minimal Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-cyan-500/5 px-4 py-1 text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        >
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Protocol v2.0 // Active Matcher</span>
        </motion.div>

        {/* Aggressive Stark Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-foreground"
        >
          Lost Something?{" "}
          <span className="block mt-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            Find It Faster.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-xl text-base tracking-tight text-muted-foreground sm:text-lg md:text-xl font-normal leading-relaxed"
        >
          LostX is the automated matching layer for university campuses. Real-time logging, instant pairing, bulletproof resolution.
        </motion.p>

        {/* Sharp Interactive Actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 w-full bg-foreground text-background font-medium hover:bg-foreground/90 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto px-8 shadow-xl"
            asChild
          >
            <Link href="/dashboard/lost/new">
              Report Lost Item
              <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-12 w-full sm:w-auto rounded-xl px-8 border-border hover:bg-secondary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
            asChild
          >
            <Link href="/browse">Browse Found Items</Link>
          </Button>
        </motion.div>

        {/* Low-profile Subtle Feature Chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {heroFeatures.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl border border-border/40 bg-secondary/20 dark:bg-neutral-900/30 px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:border-border"
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