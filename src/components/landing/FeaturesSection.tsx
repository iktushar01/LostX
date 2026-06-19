"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  PackagePlus,
  Search,
  ShieldCheck,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import { fadeUp, staggerContainer } from "./motion";

const features = [
  {
    icon: PackagePlus,
    title: "Lost Item Reporting",
    description: "Report lost belongings with photos, location, and category in seconds.",
  },
  {
    icon: FileSearch,
    title: "Found Item Reporting",
    description: "Submit found items so owners can discover and claim them quickly.",
  },
  {
    icon: Search,
    title: "Smart Item Discovery",
    description: "Search and filter across campus lost and found reports in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Claim Process",
    description: "Verify ownership through messages reviewed by trusted admins.",
  },
  {
    icon: MapPin,
    title: "Campus Search",
    description: "Find items by building, category, date, and keyword across your university.",
  },
  {
    icon: BadgeCheck,
    title: "Admin Verification",
    description: "Campus staff approve or reject claims to prevent false recoveries.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 border-t border-border/40 bg-background overflow-hidden">
      
      {/* Structural Minimal Grid Headers */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          {/* Tech Subtitle tag */}
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-blue-500 dark:text-cyan-400 bg-blue-500/5 dark:bg-cyan-500/10 border border-blue-500/20 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            Capabilities // Core Engine
          </span>
          
          <h2 className="mt-6 text-4xl font-black tracking-tighter sm:text-5xl text-foreground">
            Everything you need to recover lost items.
          </h2>
          <p className="mt-4 text-base tracking-tight text-muted-foreground max-w-xl mx-auto font-normal">
            Built for modern campuses. Rapid logging, automated parsing, and bulletproof accountability.
          </p>
        </motion.div>

        {/* Pro Micro-Bento Architecture layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-px bg-border/40 overflow-hidden rounded-2xl border border-border/40 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title} 
              variants={fadeUp} 
              custom={i}
              className="group relative bg-background p-8 transition-colors duration-300 hover:bg-neutral-500/[0.01] dark:hover:bg-neutral-400/[0.01]"
            >
              {/* Discrete Corner Bracket Accent */}
              <div className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                // 0x0{i + 1}
              </div>

              {/* Icon Container with Subtle Shadowless Glow */}
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/30 text-foreground/70 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:text-cyan-400 group-hover:bg-cyan-500/[0.03]">
                <feature.icon className="h-4 w-4 stroke-[1.8]" />
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-blue-500 dark:group-hover:text-cyan-400">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground font-normal group-hover:text-muted-foreground/90 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Ambient radial overlay hover light element */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(max-width_300px_rgba(34,211,238,0.03),transparent_70%)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}