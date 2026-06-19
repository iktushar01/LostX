"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UttaraUniversityBadge } from "./UttaraUniversityBadge";
import { UTTARA_UNIVERSITY } from "@/constants/university";
import { fadeUp } from "./motion";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-20%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15),rgba(34,211,238,0.04),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-neutral-900/30 px-6 py-16 text-center shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-md dark:bg-black/40 sm:px-12 sm:py-24"
        >
          <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-5 flex justify-center">
              <UttaraUniversityBadge size="sm" />
            </div>

            <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Ready to report or recover an item?
            </h2>

            <p className="mx-auto mt-6 text-base leading-relaxed tracking-tight text-muted-foreground">
              Join {UTTARA_UNIVERSITY.name} students using LostX instead of scattered social media
              posts. Create a free account, post in under two minutes, and let matching plus admin
              verification do the rest.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full rounded-xl bg-foreground px-8 font-medium text-background shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98] sm:w-auto"
                asChild
              >
                <Link href="/register">
                  Create free account
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-border px-8 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 active:scale-[0.98] sm:w-auto"
                asChild
              >
                <Link href="/browse">Browse campus items</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
