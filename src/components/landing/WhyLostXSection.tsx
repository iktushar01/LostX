"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { fadeUp } from "./motion";

const traditional = [
  "Facebook Posts",
  "Messenger Groups",
  "Notice Boards",
];

const lostx = [
  "Centralized Platform",
  "Faster Recovery",
  "Secure Claims",
  "Better Tracking",
];

export function WhyLostXSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-border/40 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-blue-500 dark:text-cyan-400 bg-blue-500/5 dark:bg-cyan-500/10 border border-blue-500/20 px-3 py-1 rounded-md">
            Comparison // Paradigm Shift
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tighter sm:text-5xl text-foreground">
            Better than scattered group chats.
          </h2>
        </motion.div>

        {/* Asymmetric Structural Split Container */}
        <div className="grid gap-px bg-border/40 overflow-hidden rounded-2xl border border-border/40 md:grid-cols-12">
          
          {/* Legacy Methods: Stripped back, flat, dim */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="bg-neutral-900/10 dark:bg-black/10 p-8 md:p-12 md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
                [ status: legacy_system ]
              </span>
              <h3 className="text-xl font-bold tracking-tight text-muted-foreground/80">
                The Old Method
              </h3>
              
              <div className="mt-8 space-y-4">
                {traditional.map((item) => (
                  <div key={item} className="flex items-center gap-3.5 text-sm text-muted-foreground/70">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-rose-500/20 bg-rose-500/5 text-rose-500/80">
                      <X className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="font-medium tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="mt-12 text-xs font-mono text-muted-foreground/40 hidden md:block">
              // high noise, chaotic discovery rates
            </p>
          </motion.div>

          {/* LostX System: Premium, dynamic, glow metrics */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            className="group relative bg-background p-8 md:p-12 md:col-span-7 flex flex-col justify-between transition-colors duration-300 hover:bg-neutral-500/[0.01] dark:hover:bg-neutral-400/[0.01]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                  [ status: optimal_layer ]
                </span>
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              
              <h3 className="text-xl font-black tracking-tight text-foreground bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                The LostX Protocol
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {lostx.map((item) => (
                  <div 
                    key={item} 
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-border/50 bg-secondary/20 dark:bg-neutral-900/30 transition-colors hover:border-cyan-500/20"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500/10 dark:bg-cyan-500/10 border border-emerald-500/20 dark:border-cyan-500/20 text-emerald-500 dark:text-cyan-400">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-border/40 pt-4">
              <p className="text-xs font-mono text-muted-foreground">
                // architectural campus optimization
              </p>
            </div>

            {/* Premium light beam leak overlay on container hover */}
            <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_at_80%_20%,rgba(34,211,238,0.03),transparent_70%)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}