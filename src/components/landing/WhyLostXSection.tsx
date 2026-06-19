"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { UTTARA_UNIVERSITY } from "@/constants/university";
import { fadeUp } from "./motion";

const traditional = [
  "Posts disappear under new messages within hours",
  "No search by building, date, or item type",
  "Anyone can comment \"it's mine\" with no proof",
  "Updates scattered across Facebook, Messenger, and WhatsApp",
  "No one knows if the item was already returned",
];

const lostx = [
  "One searchable board for the whole campus",
  "Filter by category and Uttara University buildings",
  "Verification questions plus admin review on every claim",
  "Email and in-app alerts when something changes",
  "Clear status: lost, found, matched, claimed, returned",
];

export function WhyLostXSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            Why LostX is better
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Stop relying on random group posts
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {UTTARA_UNIVERSITY.name} students already share lost-item posts online — but those
            threads are messy, slow, and easy to abuse. LostX fixes that.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 md:grid-cols-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-between bg-neutral-900/10 p-8 dark:bg-black/10 md:col-span-5 md:p-12"
          >
            <div>
              <span className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                The old way
              </span>
              <h3 className="text-xl font-bold tracking-tight text-muted-foreground/90">
                Facebook groups & notice boards
              </h3>

              <div className="mt-8 space-y-4">
                {traditional.map((item) => (
                  <div key={item} className="flex items-start gap-3.5 text-sm text-muted-foreground/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-rose-500/20 bg-rose-500/5 text-rose-500/80">
                      <X className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="font-medium leading-relaxed tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-sm text-muted-foreground/60">
              Sound familiar? Most items never make it back this way.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between bg-background p-8 transition-colors duration-300 hover:bg-neutral-500/[0.01] dark:hover:bg-neutral-400/[0.01] md:col-span-7 md:p-12"
          >
            <div>
              <span className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                The LostX way
              </span>

              <h3 className="text-xl font-black tracking-tight text-foreground">
                Organized lost & found for {UTTARA_UNIVERSITY.name}
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {lostx.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3.5 rounded-xl border border-border/50 bg-secondary/20 p-3 transition-colors hover:border-cyan-500/20 dark:bg-neutral-900/30"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span className="text-sm font-medium leading-relaxed tracking-tight text-foreground/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 border-t border-border/40 pt-4 text-sm text-muted-foreground">
              Faster for honest students. Safer for everyone. Made for our campus.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
