"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useShopping } from "@/context/ShoppingContext";
import { formatCurrency } from "@/lib/utils";
import type { DemoOrder, CartItem } from "@/types";
import {
  Lock,
  CreditCard,
  QrCode,
  Building2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Banknote,
} from "lucide-react";

const INDIAN_STATES = [
  { label: "Maharashtra", value: "MH" },
  { label: "Delhi NCR", value: "DL" },
  { label: "Karnataka", value: "KA" },
  { label: "Tamil Nadu", value: "TN" },
  { label: "Telangana", value: "TS" },
  { label: "Gujarat", value: "GJ" },
  { label: "West Bengal", value: "WB" },
  { label: "Rajasthan", value: "RJ" },
  { label: "Uttar Pradesh", value: "UP" },
  { label: "Kerala", value: "KL" },
  { label: "Punjab", value: "PB" },
];

const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address for dispatch updates"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(5, "Enter complete street address"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City name is required"),
  state: z.string().min(2, "Select your state"),
  pincode: z.string().regex(/^\d{6}$/, "PIN code must be exactly 6 digits"),
  deliveryMethod: z.enum(["express", "priority"]),
  paymentMethod: z.enum(["upi", "card", "netbanking", "cod"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

let demoOrderSequence = 7482;

function buildDemoOrder(
  data: CheckoutFormValues,
  cart: CartItem[],
  subtotal: number,
  discountAmount: number,
  finalShipping: number,
  finalTotal: number,
  appliedCoupon?: string
): DemoOrder {
  demoOrderSequence += 1;
  return {
    orderId: `VASTRA-DEMO-${demoOrderSequence}`,
    createdAt: "16 October 2026",
    items: [...cart],
    subtotal,
    discountAmount,
    couponCode: appliedCoupon || undefined,
    shippingFee: finalShipping,
    total: finalTotal,
    shippingAddress: {
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      address: data.address,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
    },
    deliveryMethod: data.deliveryMethod,
    paymentMethod: data.paymentMethod,
  };
}

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    subtotal,
    appliedCoupon,
    discountAmount,
    shippingEstimate,
    clearCart,
    isHydrated,
  } = useShopping();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [completedOrder, setCompletedOrder] = useState<DemoOrder | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "client@vastramay.demo",
      phone: "9876543210",
      firstName: "Dev",
      lastName: "Kapoor",
      address: "42, Heritage Looms Street, Fort",
      apartment: "Architectural Studio 4B",
      city: "Mumbai",
      state: "MH",
      pincode: "400001",
      deliveryMethod: "express",
      paymentMethod: "upi",
    },
    mode: "onBlur",
  });

  const selectedDelivery = useWatch({
    control,
    name: "deliveryMethod",
    defaultValue: "express",
  });

  // Shipping cost recalculation based on selected delivery method
  const deliveryExtra = selectedDelivery === "priority" ? 149 : 0;
  const finalShipping = shippingEstimate + deliveryExtra;
  const finalTotal = Math.max(0, subtotal - discountAmount + finalShipping);

  // Step progression validation handlers
  const handleProceedToStep2 = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await trigger(["email", "phone"]);
    if (isValid) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProceedToStep3 = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await trigger([
      "firstName",
      "lastName",
      "address",
      "city",
      "state",
      "pincode",
    ]);
    if (isValid) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onFormSubmit = (data: CheckoutFormValues) => {
    if (cart.length === 0) return;

    const orderData = buildDemoOrder(
      data,
      cart,
      subtotal,
      discountAmount,
      finalShipping,
      finalTotal,
      appliedCoupon || undefined
    );

    setCompletedOrder(orderData);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If user completed simulated order, display confirmation screen
  if (completedOrder) {
    return (
      <div className="w-full py-10 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-brand-yellow border-3 border-brand-ink shadow-neo flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-brand-ink stroke-[2.5]" />
              </div>
              <Badge variant="pink" shape="square" className="text-xs">
                ORDER SIMULATION COMPLETED
              </Badge>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                THANK YOU FOR YOUR DEMO ORDER
              </h1>
              <p className="font-mono text-sm sm:text-base font-bold text-neutral-600">
                REFERENCE CODE: <span className="text-brand-ink underline">{completedOrder.orderId}</span>
              </p>
            </div>

            {/* Explicit Demo Disclaimer Box */}
            <div className="p-5 border-3 border-brand-ink bg-brand-yellow shadow-neo space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-brand-ink stroke-[2.5] shrink-0" />
                <span className="font-display font-extrabold text-sm uppercase text-brand-ink">
                  FRONTEND SIMULATION CONFIRMATION
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                This transaction was a frontend demo simulation for Phase 4. No credit card or UPI charges occurred, no real money was transferred, and no warehouse dispatch will take place.
              </p>
            </div>

            {/* Simulated Receipt Details */}
            <div className="p-6 sm:p-8 border-3 sm:border-4 border-brand-ink bg-brand-white shadow-neo-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-brand-ink gap-2">
                <div>
                  <span className="font-mono text-xs text-neutral-500 uppercase block">ORDER DATE</span>
                  <span className="font-display font-bold text-sm sm:text-base text-brand-ink">
                    {completedOrder.createdAt}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-neutral-500 uppercase block sm:text-right">
                    PAYMENT SELECTION
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-brand-ink uppercase sm:text-right block">
                    {completedOrder.paymentMethod.toUpperCase()} (SIMULATED)
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <span className="font-display font-extrabold text-xs uppercase tracking-wider text-neutral-600 block">
                  ORDERED SILHOUETTES ({completedOrder.items.length})
                </span>
                <div className="space-y-3 divide-y-2 divide-brand-ink">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex gap-4 items-center">
                      <div className="relative w-16 h-20 border-2 border-brand-ink bg-brand-cream overflow-hidden shrink-0">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h3 className="font-display font-bold text-sm uppercase text-brand-ink line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="font-mono text-xs text-neutral-600">
                          Size: <strong>{item.size}</strong> · Color: <strong>{item.colorName}</strong> · Qty: {item.quantity}
                        </p>
                        <p className="font-display font-bold text-xs text-brand-ink">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Destination Summary */}
              <div className="pt-4 border-t-2 border-brand-ink space-y-2 text-xs font-body text-neutral-800">
                <span className="font-display font-extrabold uppercase text-neutral-600 block">
                  DISPATCH DESTINATION
                </span>
                <p className="font-bold text-brand-ink">{completedOrder.shippingAddress.fullName}</p>
                <p>{completedOrder.shippingAddress.address}, {completedOrder.shippingAddress.apartment}</p>
                <p>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} — {completedOrder.shippingAddress.pincode}</p>
                <p className="font-mono text-neutral-600">Contact: {completedOrder.shippingAddress.phone} · {completedOrder.shippingAddress.email}</p>
              </div>

              {/* Financial Breakdown */}
              <div className="pt-4 border-t-2 border-brand-ink space-y-2 font-display text-xs uppercase">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-brand-ink">
                    {formatCurrency(completedOrder.subtotal)}
                  </span>
                </div>
                {completedOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-brand-pink font-bold">
                    <span>Discount ({completedOrder.couponCode || "COUPON"})</span>
                    <span className="font-mono">-{formatCurrency(completedOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-700">
                  <span>Shipping Fee</span>
                  <span className="font-mono font-bold">
                    {completedOrder.shippingFee === 0 ? "FREE" : formatCurrency(completedOrder.shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t-2 border-brand-ink flex justify-between items-center text-base sm:text-lg font-extrabold text-brand-ink">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl sm:text-2xl text-brand-ink">
                    {formatCurrency(completedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Back to Shop Action */}
            <div className="text-center pt-2">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                >
                  CONTINUE BROWSING CATALOG
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Empty Cart Guard
  if (isHydrated && cart.length === 0) {
    return (
      <div className="w-full py-16">
        <Container>
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8 text-brand-ink stroke-[2.2]" />}
            title="YOUR BAG IS EMPTY — CANNOT CHECKOUT"
            description="You need at least one garment staged in your shopping bag before advancing to shipping and payment."
            action={
              <Link href="/shop">
                <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}>
                  RETURN TO ARCHIVES
                </Button>
              </Link>
            }
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-1 font-display text-xs font-bold uppercase text-brand-pink hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  Return to Bag
                </Link>
                <span className="text-neutral-400">/</span>
                <Badge variant="yellow" shape="square" className="text-xs">
                  CHECKOUT STAGING
                </Badge>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                DISPATCH & DEMO PAYMENT
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-600 bg-brand-cream px-3 py-1.5 border-2 border-brand-ink shadow-neo-sm">
              <Lock className="w-4 h-4 text-brand-ink" />
              <span>CLIENT-SIDE DEMO CHECKOUT</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-3 gap-2 border-2 border-brand-ink bg-brand-cream p-2 shadow-neo-sm">
            {[
              { num: 1, label: "Contact Details" },
              { num: 2, label: "Shipping Address" },
              { num: 3, label: "Delivery & Payment" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num as 1 | 2 | 3);
                }}
                className={`py-2 px-1 text-center font-display text-xs font-bold uppercase transition-all ${
                  currentStep === s.num
                    ? "bg-brand-pink text-brand-ink border-2 border-brand-ink shadow-neo-sm"
                    : currentStep > s.num
                    ? "bg-brand-white text-brand-ink border border-brand-ink hover:bg-brand-yellow cursor-pointer"
                    : "text-neutral-400 cursor-not-allowed"
                }`}
              >
                <span>{s.num}. {s.label}</span>
              </button>
            ))}
          </div>

          {/* Main Checkout Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Multi-Step Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="lg:col-span-7 space-y-6">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="p-5 sm:p-6 border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-brand-ink">
                    <h2 className="font-display font-extrabold text-base uppercase tracking-tight text-brand-ink">
                      STEP 1: CONTACT INFORMATION
                    </h2>
                    <span className="font-mono text-xs text-neutral-500">1 OF 3</span>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      label="Email Address for Dispatch Updates"
                      required
                      error={errors.email?.message}
                    >
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="you@domain.com"
                        error={Boolean(errors.email)}
                      />
                    </FormField>

                    <FormField
                      label="Mobile Contact Number (+91)"
                      required
                      error={errors.phone?.message}
                    >
                      <Input
                        type="tel"
                        {...register("phone")}
                        placeholder="10-digit mobile number"
                        error={Boolean(errors.phone)}
                      />
                    </FormField>
                  </div>

                  <div className="pt-4 border-t-2 border-brand-ink flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleProceedToStep2}
                      rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                    >
                      CONTINUE TO SHIPPING ADDRESS
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Destination */}
              {currentStep === 2 && (
                <div className="p-5 sm:p-6 border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-brand-ink">
                    <h2 className="font-display font-extrabold text-base uppercase tracking-tight text-brand-ink">
                      STEP 2: SHIPPING DESTINATION
                    </h2>
                    <span className="font-mono text-xs text-neutral-500">2 OF 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="First Name"
                      required
                      error={errors.firstName?.message}
                    >
                      <Input
                        type="text"
                        {...register("firstName")}
                        error={Boolean(errors.firstName)}
                      />
                    </FormField>

                    <FormField
                      label="Last Name"
                      required
                      error={errors.lastName?.message}
                    >
                      <Input
                        type="text"
                        {...register("lastName")}
                        error={Boolean(errors.lastName)}
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Street Address / Building"
                    required
                    error={errors.address?.message}
                  >
                    <Input
                      type="text"
                      {...register("address")}
                      placeholder="Flat, street, building number"
                      error={Boolean(errors.address)}
                    />
                  </FormField>

                  <FormField label="Apartment, Studio, Landmark (Optional)">
                    <Input
                      type="text"
                      {...register("apartment")}
                      placeholder="Suite, floor, or nearby landmark"
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label="City"
                      required
                      error={errors.city?.message}
                    >
                      <Input
                        type="text"
                        {...register("city")}
                        error={Boolean(errors.city)}
                      />
                    </FormField>

                    <FormField
                      label="State"
                      required
                      error={errors.state?.message}
                    >
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={INDIAN_STATES}
                            error={Boolean(errors.state)}
                          />
                        )}
                      />
                    </FormField>

                    <FormField
                      label="PIN Code"
                      required
                      error={errors.pincode?.message}
                    >
                      <Input
                        type="text"
                        maxLength={6}
                        {...register("pincode")}
                        placeholder="6 digits"
                        error={Boolean(errors.pincode)}
                      />
                    </FormField>
                  </div>

                  <div className="pt-4 border-t-2 border-brand-ink flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                      leadingIcon={<ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
                    >
                      BACK TO CONTACT
                    </Button>

                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleProceedToStep3}
                      rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                    >
                      CONTINUE TO PAYMENT
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Delivery Method & Simulated Payment */}
              {currentStep === 3 && (
                <div className="p-5 sm:p-6 border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-brand-ink">
                    <h2 className="font-display font-extrabold text-base uppercase tracking-tight text-brand-ink">
                      STEP 3: DELIVERY & PAYMENT
                    </h2>
                    <span className="font-mono text-xs text-neutral-500">3 OF 3</span>
                  </div>

                  {/* Delivery Selection */}
                  <div className="space-y-2">
                    <span className="font-display text-xs font-bold uppercase text-neutral-700 block">
                      Choose Delivery Method
                    </span>
                    <Controller
                      name="deliveryMethod"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => field.onChange("express")}
                            className={`p-3 border-2 border-brand-ink text-left transition-all cursor-pointer ${
                              field.value === "express"
                                ? "bg-brand-cream border-brand-ink shadow-neo-sm"
                                : "bg-brand-white hover:bg-neutral-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-xs font-extrabold uppercase">
                                Express Air Delivery
                              </span>
                              <span className="font-mono font-bold text-xs text-emerald-700">
                                {shippingEstimate === 0 ? "FREE" : formatCurrency(shippingEstimate)}
                              </span>
                            </div>
                            <p className="font-body text-[11px] text-neutral-600 mt-1">
                              2 to 3 days across metropolitan cities
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => field.onChange("priority")}
                            className={`p-3 border-2 border-brand-ink text-left transition-all cursor-pointer ${
                              field.value === "priority"
                                ? "bg-brand-yellow border-brand-ink shadow-neo-sm"
                                : "bg-brand-white hover:bg-neutral-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-xs font-extrabold uppercase">
                                Priority Dispatch
                              </span>
                              <span className="font-mono font-bold text-xs">
                                {formatCurrency(shippingEstimate + 149)}
                              </span>
                            </div>
                            <p className="font-body text-[11px] text-neutral-600 mt-1">
                              Packed & handed to air courier within 6 hours
                            </p>
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  {/* Simulated Payment Method Selection */}
                  <div className="space-y-2 pt-2">
                    <span className="font-display text-xs font-bold uppercase text-neutral-700 block">
                      Select Payment Channel (Simulated Demo)
                    </span>
                    <Controller
                      name="paymentMethod"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: "upi", label: "Instant UPI", icon: <QrCode className="w-4 h-4" /> },
                            { id: "card", label: "Credit/Debit", icon: <CreditCard className="w-4 h-4" /> },
                            { id: "netbanking", label: "Netbanking", icon: <Building2 className="w-4 h-4" /> },
                            { id: "cod", label: "Cash on Delivery", icon: <Banknote className="w-4 h-4" /> },
                          ].map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => field.onChange(m.id)}
                              className={`p-3 border-2 border-brand-ink flex flex-col items-center gap-1.5 font-display text-xs font-bold uppercase transition-all cursor-pointer text-center ${
                                field.value === m.id
                                  ? "bg-brand-pink text-brand-ink shadow-neo-sm"
                                  : "bg-brand-white text-brand-ink hover:bg-brand-cream"
                              }`}
                            >
                              {m.icon}
                              <span className="text-[11px]">{m.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  {/* Submit Order Action */}
                  <div className="pt-4 border-t-2 border-brand-ink flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(2)}
                      leadingIcon={<ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
                    >
                      BACK TO ADDRESS
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1 justify-center py-4"
                    >
                      CONFIRM DEMO ORDER ({formatCurrency(finalTotal)})
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Right Column: Live Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-3 sm:border-4 border-brand-ink bg-brand-cream p-6 shadow-neo-lg space-y-5">
                <h2 className="font-display font-extrabold text-base sm:text-lg uppercase tracking-tight text-brand-ink pb-3 border-b-2 border-brand-ink">
                  ORDER SUMMARY ({cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"})
                </h2>

                {/* Staged Cart Items Preview */}
                <div className="space-y-3 divide-y-2 divide-brand-ink max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <div className="relative w-14 h-18 border-2 border-brand-ink bg-brand-white overflow-hidden shrink-0">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h3 className="font-display font-bold text-xs uppercase text-brand-ink line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="font-mono text-[10px] text-neutral-600">
                          Size: {item.size} · Color: {item.colorName} · Qty: {item.quantity}
                        </p>
                        <p className="font-display font-extrabold text-xs text-brand-ink">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-3 border-t-2 border-brand-ink font-display text-xs uppercase">
                  <div className="flex justify-between text-neutral-700">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-brand-ink">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-brand-pink font-bold">
                      <span>Coupon ({appliedCoupon})</span>
                      <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-700">
                    <span>Delivery ({selectedDelivery})</span>
                    <span className="font-mono font-bold">
                      {finalShipping === 0 ? "FREE" : formatCurrency(finalShipping)}
                    </span>
                  </div>

                  <div className="pt-2 border-t-2 border-brand-ink flex justify-between items-center text-base sm:text-lg font-extrabold text-brand-ink">
                    <span>Estimated Total</span>
                    <span className="font-mono text-xl text-brand-ink">
                      {formatCurrency(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Notice Banner */}
              <div className="p-4 border-2 border-brand-ink bg-brand-yellow flex items-start gap-2 shadow-neo-sm">
                <AlertTriangle className="w-4 h-4 text-brand-ink shrink-0 mt-0.5 stroke-[2.5]" />
                <p className="font-body text-xs text-neutral-900 leading-tight">
                  <strong>Simulated Checkout Mode:</strong> Completing this form will generate a fictional demo receipt and reset your staged bag. Real payment gateways belong to Phase 5.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
