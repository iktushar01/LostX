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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to recover lost items
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built for students, staff, and campus admins — fast, secure, and centralized.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={feature.title} variants={fadeUp} custom={i}>
              <Card className="group h-full border-border/60 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-blue-600 transition-colors group-hover:from-blue-500/25 group-hover:to-cyan-400/25 dark:text-cyan-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
