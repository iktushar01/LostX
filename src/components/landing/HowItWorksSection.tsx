"use client";

import { motion } from "framer-motion";
import { ClipboardList, Search, PartyPopper } from "lucide-react";
import { fadeUp, staggerContainer } from "./motion";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Report Lost or Found Item",
    description:
      "Students submit a report with title, category, location, and optional photo.",
  },
  {
    step: "02",
    icon: Search,
    title: "Search and Match Items",
    description:
      "Browse campus listings, filter by category, and discover potential matches instantly.",
  },
  {
    step: "03",
    icon: PartyPopper,
    title: "Recover Your Belongings",
    description:
      "Submit a secure claim, get admin approval, and reunite with what matters most.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 border-t border-border/40 bg-neutral-900/10 dark:bg-black/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header Structure */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-blue-500 dark:text-cyan-400 bg-blue-500/5 dark:bg-cyan-500/10 border border-blue-500/20 px-3 py-1 rounded-md">
            Execution // Lifecycle
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tighter sm:text-5xl text-foreground">
            Three steps to recovery.
          </h2>
        </motion.div>

        {/* Sharp Linear Connective Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="relative grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16"
        >
          {/* Futuristic horizontal timeline connector beam */}
          <div className="absolute left-[10%] right-[10%] top-[2.25rem] hidden h-[1px] bg-gradient-to-r from-blue-500/0 via-border/80 to-cyan-500/0 md:block" />

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              custom={i}
              className="group relative flex flex-col items-start"
            >
              {/* Top Node Indicator Area */}
              <div className="mb-6 flex w-full items-center justify-between md:justify-start md:gap-4">
                {/* Node Ring Icon */}
                <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-xl border border-border/80 bg-background transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.06)]">
                  <item.icon className="h-5 w-5 text-foreground/70 transition-colors group-hover:text-cyan-400" />
                  
                  {/* Digital Index Tab */}
                  <span className="absolute -bottom-2 -right-2 font-mono text-[10px] bg-secondary border border-border px-1.5 py-0.5 rounded text-muted-foreground/80 scale-90 group-hover:text-foreground transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Massive Translucent Background Number for Mobile/Viewport contrast */}
                <span className="font-mono text-5xl font-black text-neutral-300/20 dark:text-neutral-800/30 select-none md:hidden">
                  #{item.step}
                </span>
              </div>

              {/* Text Layout Block */}
              <div className="mt-2 space-y-3">
                <span className="font-mono text-[10px] tracking-widest uppercase text-blue-500 dark:text-cyan-400 font-bold block">
                  STAGE_0{i + 1}
                </span>
                
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-500 dark:group-hover:text-cyan-400">
                  {item.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}