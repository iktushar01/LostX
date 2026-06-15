"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Why LostX
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Better than scattered group chats
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="h-full border-border/60 bg-background/60 opacity-90">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">
                  Traditional Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {traditional.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
          >
            <Card className="h-full border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 shadow-lg shadow-blue-500/5">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-lg text-transparent">
                  LostX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lostx.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-medium">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
