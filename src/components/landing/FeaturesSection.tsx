"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  PackagePlus,
  Sparkles,
  ShieldCheck,
  MapPin,
  Bell,
} from "lucide-react";
import { fadeUp, staggerContainer } from "./motion";

const features = [
  {
    icon: PackagePlus,
    title: "Report lost items",
    description:
      "Add a title, photo, category, and where you last had it on campus. Set a secret verification question so only you can prove ownership later.",
  },
  {
    icon: FileSearch,
    title: "Report found items",
    description:
      "Found a phone, ID, or keys? Post it with the building and date so the owner can find it without posting in five different group chats.",
  },
  {
    icon: Sparkles,
    title: "Smart matching",
    description:
      "LostX compares lost and found reports by category, location, date, and title — and highlights likely matches on browse and item pages.",
  },
  {
    icon: ShieldCheck,
    title: "Safe claim process",
    description:
      "Claims require the correct verification answer and admin approval before anyone shares contact details or arranges a handoff.",
  },
  {
    icon: MapPin,
    title: "Campus location picker",
    description:
      "Pick real Uttara University buildings — Administration, Science Building, Boys Hostel, Sports Complex, and more — instead of vague text posts.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Get notified by email and inside the app when your claim is approved, rejected, or when someone may have found your item.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            What you can do
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            Built for how students actually lose things
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-normal tracking-tight text-muted-foreground">
            LostX is not just a bulletin board. It helps you report, search, match, verify, and
            return items across the Uttara University campus with less stress and less spam.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="group relative bg-background p-8 transition-colors duration-300 hover:bg-neutral-500/[0.01] dark:hover:bg-neutral-400/[0.01]"
            >
              <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-secondary/30 text-foreground/70 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/[0.03] group-hover:text-cyan-400">
                <feature.icon className="h-4 w-4 stroke-[1.8]" />
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed text-muted-foreground transition-colors group-hover:text-muted-foreground/90">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
