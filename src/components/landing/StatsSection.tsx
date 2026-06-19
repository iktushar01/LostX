"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, MapPin, PackageCheck } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { fadeUp, staggerContainer } from "./motion";

const stats = [
  { icon: MapPin, value: 14, suffix: "+", label: "Campus buildings covered" },
  { icon: PackageCheck, value: 5, suffix: "", label: "Steps from lost to returned" },
  { icon: ShieldCheck, value: 2, suffix: "-step", label: "Verification and admin review" },
  { icon: Clock, value: 24, suffix: "/7", label: "Always available online" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-neutral-900/10 dark:bg-black/20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-7xl divide-y divide-border/40 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:border-x lg:border-border/40"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i}
            className="group relative flex flex-col justify-between p-8 transition-colors duration-300 hover:bg-neutral-500/[0.02] dark:hover:bg-neutral-400/[0.01] md:p-10"
          >
            <div className="flex flex-col gap-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/30 text-foreground/70 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-400">
                <stat.icon className="h-4 w-4 stroke-[1.8]" />
              </div>

              <div className="space-y-1">
                <p className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground/80">
                  {stat.label}
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
