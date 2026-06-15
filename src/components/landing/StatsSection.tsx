"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, PackageCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="border-y border-border/50 bg-muted/30 py-16 md:py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} custom={i}>
            <Card className="border-border/60 bg-background/80 backdrop-blur-sm transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-blue-600 dark:text-cyan-400">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
