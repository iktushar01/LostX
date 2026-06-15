"use client";

import { motion } from "framer-motion";
import { Wallet, IdCard, Laptop, KeyRound } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { fadeUp, staggerContainer } from "./motion";

const demoItems = [
  {
    icon: Wallet,
    title: "Brown Leather Wallet",
    location: "Main Library",
    date: "Mar 12, 2026",
    status: "Found",
    statusVariant: "default" as const,
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: IdCard,
    title: "Student ID Card",
    location: "Student Center",
    date: "Mar 10, 2026",
    status: "Lost",
    statusVariant: "destructive" as const,
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Laptop,
    title: "Silver Laptop",
    location: "Engineering Lab",
    date: "Mar 8, 2026",
    status: "Matched",
    statusVariant: "secondary" as const,
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: KeyRound,
    title: "Key Bundle",
    location: "Parking Lot B",
    date: "Mar 7, 2026",
    status: "Available",
    statusVariant: "outline" as const,
    gradient: "from-emerald-500/20 to-green-500/10",
  },
];

export function DemoItemsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Live Listings
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Recent campus items
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sample reports from your university lost & found board.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {demoItems.map((item, i) => (
            <motion.div key={item.title} variants={fadeUp} custom={i}>
              <Card className="group h-full overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div
                  className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${item.gradient}`}
                >
                  <item.icon className="h-12 w-12 text-foreground/40 transition-transform group-hover:scale-110" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-base">{item.title}</CardTitle>
                    <Badge variant={item.statusVariant} className="shrink-0 text-[10px]">
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 text-sm text-muted-foreground">
                  <p>{item.location}</p>
                  <p className="mt-1 text-xs">{item.date}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/browse"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-cyan-400"
                  >
                    View on browse →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
