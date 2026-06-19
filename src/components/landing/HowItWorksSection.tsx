"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Search,
  Handshake,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { fadeUp, staggerContainer } from "./motion";

const steps = [
  {
    step: "1",
    icon: ClipboardList,
    title: "Create your report",
    description:
      "Sign in and post a lost or found item with a photo, category, and campus location — like Central Library, Engineering Building, or Cafeteria.",
  },
  {
    step: "2",
    icon: Search,
    title: "Browse and get matches",
    description:
      "Search all campus listings by keyword, category, or building. LostX suggests possible matches when a found item looks like your lost report.",
  },
  {
    step: "3",
    icon: ShieldCheck,
    title: "Submit a verified claim",
    description:
      "Think you found your item? Submit a claim and answer verification questions. Campus admins review every claim before anyone can arrange a handoff.",
  },
  {
    step: "4",
    icon: Handshake,
    title: "Admin approves the handoff",
    description:
      "Campus admins review claims so random people cannot take someone else's belongings. You get email and in-app updates when your claim is approved or rejected.",
  },
  {
    step: "5",
    icon: MessageSquare,
    title: "Meet safely and mark returned",
    description:
      "After approval, chat with the finder inside LostX to arrange pickup. Once you have your item back, mark it as returned so everyone knows the case is closed.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-border/40 bg-neutral-900/10 py-24 dark:bg-black/20 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            How to use LostX
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            From lost to returned in five steps
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Whether you lost your ID at the Cafeteria or found a wallet near the Student Center,
            this is the full process — the same flow every Uttara University student follows.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              custom={i}
              className="group relative flex flex-col rounded-2xl border border-border/50 bg-background/60 p-6 transition-colors hover:border-cyan-500/20"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-secondary/30 transition-colors group-hover:border-cyan-500/40 group-hover:text-cyan-400">
                  <item.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-cyan-400">
                  {item.step}
                </span>
              </div>

              <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
