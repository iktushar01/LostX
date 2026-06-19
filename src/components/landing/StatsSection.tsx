"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, PackageCheck } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { fadeUp, staggerContainer } from "./motion";

const stats = [
  { icon: PackageCheck, value: 500, suffix: "+", label: "Items Recovered" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Recovery Success" },
  { icon: Users, value: 1000, suffix: "+", label: "Active Students" },
  { icon: Clock, value: 24, suffix: "/7", label: "Availability" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-neutral-900/10 dark:bg-black/20">
      
      {/* Container with grid borders bleeding across screens */}
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
            className="group relative flex flex-col justify-between p-8 md:p-10 transition-colors duration-300 hover:bg-neutral-500/[0.02] dark:hover:bg-neutral-400/[0.01]"
          >
            {/* Minimal Index Badge in upper right corner */}
            <span className="absolute right-6 top-6 font-mono text-[10px] text-muted-foreground/50 tracking-wider">
              [ 0{i + 1} ]
            </span>

            <div className="flex flex-col gap-6">
              {/* Ultra-Clean Modern Icon Frame */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/30 text-foreground/70 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-400">
                <stat.icon className="h-4 w-4 stroke-[1.8]" />
              </div>

              {/* Big Stark Numbers */}
              <div className="space-y-1">
                <p className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground/80">
                  {stat.label}
                </p>
              </div>
            </div>

            {/* Bottom Tech-line Highlight on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}