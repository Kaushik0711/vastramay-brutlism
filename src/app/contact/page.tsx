"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { toast } from "@/components/ui/toast";
import {
  Mail,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "customer-care",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields", {
        description: "Your name, valid email, and query message are required.",
      });
      return;
    }

    setSubmitted(true);
    toast.success("Message received!", {
      description:
        "Demo storefront notice: In Phase 3, this contact submission is handled locally as a client preview.",
    });
  };

  return (
    <div className="w-full py-10 sm:py-16 space-y-12">
      <Container>
        {/* Header */}
        <div className="max-w-2xl space-y-3 pb-8 border-b-2 sm:border-b-3 border-brand-ink">
          <Badge variant="pink" shape="square" className="text-xs">
            CUSTOMER DESK
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            CONTACT THE STUDIO
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed">
            Have questions about garment measurements, fabric characteristics, or bespoke styling? Reach our studio team directly below.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 border-3 sm:border-4 border-brand-ink bg-brand-white shadow-neo-lg space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-brand-ink">
                <h2 className="font-display font-extrabold text-base sm:text-lg uppercase tracking-tight text-brand-ink">
                  SEND AN INQUIRY
                </h2>
                <span className="font-mono text-xs text-neutral-500">DEMO FORM</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Your Full Name" required>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Arjun Mehta"
                  />
                </FormField>

                <FormField label="Email Address" required>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@domain.com"
                  />
                </FormField>
              </div>

              <FormField label="Inquiry Department" required>
                <Select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  options={[
                    { label: "Customer Care & Order Inquiries", value: "customer-care" },
                    { label: "Garment Fit & Sizing Guidance", value: "sizing" },
                    { label: "Artisan Textile & Fabric Questions", value: "textiles" },
                    { label: "Press, Editorial & Collaborations", value: "press" },
                  ]}
                />
              </FormField>

              <FormField label="Your Message" required>
                <Textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Detail your inquiry, sizing doubts, or question here..."
                />
              </FormField>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  rightIcon={<Send className="w-4 h-4 stroke-[2.5]" />}
                >
                  {submitted ? "MESSAGE SENT ✓" : "SUBMIT INQUIRY"}
                </Button>
              </div>

              {submitted && (
                <div className="p-4 border-2 border-brand-ink bg-emerald-100 flex items-start gap-2 shadow-neo-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-emerald-900 leading-tight">
                    Thank you! Your demo inquiry was validated. Centralized email notification dispatch is scheduled for backend phases.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Studio Hours & Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 border-3 border-brand-ink bg-brand-cream shadow-neo space-y-6">
              <h2 className="font-display font-extrabold text-base uppercase tracking-tight text-brand-ink pb-3 border-b-2 border-brand-ink">
                STUDIO HEADQUARTERS
              </h2>

              <div className="space-y-4 font-body text-sm text-neutral-800">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-display uppercase block text-brand-ink">
                      Design Studio (Demo Location)
                    </strong>
                    <span className="text-neutral-600">
                      42, Kala Ghoda Arts & Heritage District, Fort, Mumbai 400001, Maharashtra, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-display uppercase block text-brand-ink">
                      Operating Hours
                    </strong>
                    <span className="text-neutral-600">
                      Monday to Saturday: 10:00 AM – 7:00 PM IST <br />
                      Sunday: Studio Closed for Artisan Weaving
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-display uppercase block text-brand-ink">
                      Electronic Mail
                    </strong>
                    <span className="font-mono text-xs text-neutral-600">
                      care@vastramay.demo · studio@vastramay.demo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to FAQ */}
            <div className="p-6 border-3 border-brand-ink bg-brand-yellow shadow-neo space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 stroke-[2.5] text-brand-ink" />
                <h3 className="font-display font-extrabold text-sm uppercase tracking-tight text-brand-ink">
                  LOOKING FOR QUICK ANSWERS?
                </h3>
              </div>
              <p className="font-body text-xs text-neutral-800 leading-relaxed font-medium">
                Find immediate answers regarding 7-day doorstep exchanges, garment measurement guides, washing silk jacquards, and courier tracking on our FAQ page.
              </p>
              <Link href="/faq" className="inline-block pt-1">
                <Button variant="outline" size="sm" className="bg-brand-white">
                  VISIT FAQ PAGE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
