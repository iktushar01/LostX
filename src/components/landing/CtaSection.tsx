"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "./motion";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-4 sm:px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Recover What Matters?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-50/90">
            Join your campus community on LostX — report, search, and claim items securely.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 w-full bg-white text-blue-700 hover:bg-white/90 sm:w-auto"
              asChild
            >
              <Link href="/dashboard/lost/new">
                Report Lost Item
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              asChild
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
