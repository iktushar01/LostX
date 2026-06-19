"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "./motion";

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-border/40 bg-background overflow-hidden">
      
      {/* Structural Minimal Grid & Radial Mesh Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 bottom-[-20%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15),rgba(34,211,238,0.04),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-neutral-900/30 dark:bg-black/40 backdrop-blur-md px-6 py-16 text-center sm:px-12 sm:py-24 shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
        >
          {/* Subtle Accent Terminal Light Block */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Tech Subtitle Header Tag */}
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-500 dark:text-cyan-400 block mb-4">
              Deploy // Join Network
            </span>
            
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-foreground">
              Ready to Recover <br className="hidden sm:inline" /> What Matters?
            </h2>
            
            <p className="mx-auto mt-6 text-base tracking-tight text-muted-foreground leading-relaxed">
              Join your campus community on LostX. Instant reporting pipelines, automated search matches, and lightning-fast item recovery layers.
            </p>

            {/* High-Contrast Interactive Actions */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full bg-foreground text-background font-medium hover:bg-foreground/90 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto px-8 shadow-md"
                asChild
              >
                <Link href="/dashboard/lost/new">
                  Report Lost Item
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full sm:w-auto rounded-xl px-8 border-border hover:bg-secondary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}