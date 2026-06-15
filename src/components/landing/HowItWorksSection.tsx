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
    <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to recovery
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid gap-8 md:grid-cols-3"
        >
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              custom={i}
              className="relative rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-cyan-400">
                  STEP {item.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
                  <item.icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
