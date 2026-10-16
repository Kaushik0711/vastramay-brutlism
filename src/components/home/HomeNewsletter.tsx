"use client";

import React, { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail } from "lucide-react";

export function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.", {
        description: "A valid email format is required to receive drop notifications.",
      });
      return;
    }

    setSubmitted(true);
    toast.success("Welcome to Vastramay Collective!", {
      description: "Frontend demo confirmation: You are in line for future private drops.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      <div className="relative flex-1">
        <label htmlFor="home-newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Mail className="w-5 h-5 stroke-[2.2]" />
        </div>
        <input
          id="home-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER YOUR EMAIL FOR EARLY DROPS..."
          className="w-full pl-11 pr-4 py-3.5 bg-brand-white border-2 sm:border-3 border-brand-ink text-brand-ink placeholder:text-neutral-500 font-display text-xs sm:text-sm font-bold tracking-wide outline-none shadow-neo-sm focus:shadow-neo transition-all"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
        className="shrink-0 text-xs sm:text-sm"
      >
        {submitted ? "REGISTERED ✓" : "JOIN COLLECTIVE"}
      </Button>
    </form>
  );
}
