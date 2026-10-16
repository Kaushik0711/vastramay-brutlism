"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  RadioItem,
  Switch,
  FormField,
  Alert,
  Spinner,
  Skeleton,
  EmptyState,
  ErrorState,
  Progress,
  toast,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ConfirmDialog,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DropdownMenu,
  Popover,
  Tooltip,
  Accordion,
  Tabs,
  Breadcrumbs,
  Pagination,
} from "@/components/ui";
import { ProductCard } from "@/components/product/ProductCard";
import { PriceTag } from "@/components/product/PriceTag";
import { sampleProducts } from "@/data/products";
import type { Product } from "@/types";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Search,
  Mail,
  Info,
  CheckCircle2,
  Trash2,
  Sliders,
  HelpCircle,
  ExternalLink,
  Palette,
  SlidersHorizontal,
  RotateCcw,
  Zap,
  Layers,
} from "lucide-react";
import { useCustomization } from "@/context/CustomizationContext";
import { cn } from "@/lib/utils";

export default function ComponentShowcasePage() {
  // Modal & Drawer State
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<"left" | "right" | "bottom">("right");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Form interactive demo states
  const [inputVal, setInputVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const [selectVal, setSelectVal] = useState("cotton");
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState("standard");
  const [switchVal, setSwitchVal] = useState(true);
  const [simulateError, setSimulateError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Interactive page number
  const [currentPage, setCurrentPage] = useState(2);

  // Runtime Customization Hook (Phase 5)
  const {
    theme,
    updateColor,
    updateGeometry,
    updateMotion,
    resetTheme,
    isModified,
    prefersReducedMotion,
    cssVariables,
  } = useCustomization();

  // Sample Product
  const demoProduct = sampleProducts[0];

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      {/* Dev Header Banner */}
      <section className="bg-brand-yellow border-b-3 border-brand-ink py-8 sm:py-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="dark" shape="square">
                  INTERNAL DEV TOOL
                </Badge>
                <Badge variant="pink" shape="square">
                  PHASE 2 COMPONENT SYSTEM
                </Badge>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                NEO-BRUTALISM COMPONENT LIBRARY
              </h1>
              <p className="font-body text-sm sm:text-base text-neutral-800 max-w-2xl leading-relaxed">
                Interactive preview and testing matrix for all foundational primitives, form controls, overlays, and feedback components.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Breadcrumbs
                items={[
                  { label: "Vastramay", href: "/" },
                  { label: "Dev Tools" },
                  { label: "Components" },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      <div className="py-12">
        <Container className="space-y-16">
          {/* SECTION 0: THEME & MOTION STUDIO (PHASE 5) */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-brand-ink pb-4">
              <div className="flex items-center gap-3">
                <Badge variant="yellow">00</Badge>
                <div>
                  <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink flex items-center gap-2">
                    <SlidersHorizontal className="w-6 h-6 stroke-[2.5] text-brand-pink" />
                    THEME & MOTION CUSTOMIZATION STUDIO
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-neutral-600 mt-0.5">
                    Live runtime control panel for brand colors, border widths, shadow offsets, corner radii, and animation presets.
                  </p>
                </div>
              </div>

              {isModified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetTheme}
                  leadingIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  className="bg-brand-white shrink-0"
                >
                  RESET DEFAULTS
                </Button>
              )}
            </div>

            {/* Customizer Control Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Color Customization */}
              <Card className="p-5 bg-brand-white space-y-4">
                <div className="flex items-center gap-2 font-display font-bold text-sm uppercase text-brand-ink border-b border-brand-ink/20 pb-2">
                  <Palette className="w-4 h-4 text-brand-pink" />
                  <span>Palette & Contrast</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Primary Accent ({theme.colors.brandPrimary}):
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "Pink", hex: "#FF5C8A" },
                        { label: "Yellow", hex: "#FFE14A" },
                        { label: "Blue", hex: "#4867F5" },
                        { label: "Emerald", hex: "#10B981" },
                        { label: "Purple", hex: "#8B5CF6" },
                      ].map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => updateColor("brandPrimary", c.hex)}
                          style={{ backgroundColor: c.hex }}
                          className={cn(
                            "w-8 h-8 rounded-[2px] border-2 border-brand-ink transition-transform cursor-pointer",
                            theme.colors.brandPrimary === c.hex ? "scale-110 shadow-neo-sm ring-2 ring-brand-ink" : "hover:scale-105"
                          )}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Canvas Background:
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "Cream", hex: "#F7F1E5" },
                        { label: "White", hex: "#FFFFFF" },
                        { label: "Gray", hex: "#F3F4F6" },
                      ].map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => updateColor("bgBase", c.hex)}
                          style={{ backgroundColor: c.hex }}
                          className={cn(
                            "px-2.5 py-1 text-xs font-mono font-bold border-2 border-brand-ink transition-all cursor-pointer",
                            theme.colors.bgBase === c.hex ? "bg-brand-ink text-brand-white shadow-neo-sm" : "hover:bg-brand-cream"
                          )}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Geometry Customization */}
              <Card className="p-5 bg-brand-white space-y-4">
                <div className="flex items-center gap-2 font-display font-bold text-sm uppercase text-brand-ink border-b border-brand-ink/20 pb-2">
                  <Layers className="w-4 h-4 text-brand-yellow" />
                  <span>Geometry & Shadows</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Border Thickness: {theme.geometry.borderWidth}px
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((bw) => (
                        <button
                          key={bw}
                          type="button"
                          onClick={() => updateGeometry("borderWidth", bw)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono font-bold border-2 border-brand-ink transition-all cursor-pointer text-center",
                            theme.geometry.borderWidth === bw
                              ? "bg-brand-yellow text-brand-ink shadow-neo-sm font-extrabold"
                              : "bg-brand-white hover:bg-neutral-100"
                          )}
                        >
                          {bw}px
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Hard Shadow Offset: {theme.geometry.shadowOffset}px
                    </span>
                    <div className="flex items-center gap-2">
                      {[0, 2, 4, 6, 8].map((so) => (
                        <button
                          key={so}
                          type="button"
                          onClick={() => updateGeometry("shadowOffset", so)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono font-bold border-2 border-brand-ink transition-all cursor-pointer text-center",
                            theme.geometry.shadowOffset === so
                              ? "bg-brand-pink text-brand-ink shadow-neo-sm font-extrabold"
                              : "bg-brand-white hover:bg-neutral-100"
                          )}
                        >
                          {so}px
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Corner Radius: {theme.geometry.radius}px
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "0px (Sharp)", val: 0 },
                        { label: "2px (Neo)", val: 2 },
                        { label: "6px (Soft)", val: 6 },
                      ].map((r) => (
                        <button
                          key={r.val}
                          type="button"
                          onClick={() => updateGeometry("radius", r.val)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono font-bold border-2 border-brand-ink transition-all cursor-pointer text-center",
                            theme.geometry.radius === r.val
                              ? "bg-brand-blue text-brand-white shadow-neo-sm"
                              : "bg-brand-white hover:bg-neutral-100"
                          )}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Motion & Interaction Physics */}
              <Card className="p-5 bg-brand-white space-y-4">
                <div className="flex items-center gap-2 font-display font-bold text-sm uppercase text-brand-ink border-b border-brand-ink/20 pb-2">
                  <Zap className="w-4 h-4 text-brand-blue" />
                  <span>Motion & Accessibility</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Animation Speed: {theme.motion.durationBaseMs}ms
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "Fast (120ms)", ms: 120 },
                        { label: "Standard (200ms)", ms: 200 },
                        { label: "Relaxed (350ms)", ms: 350 },
                      ].map((m) => (
                        <button
                          key={m.ms}
                          type="button"
                          onClick={() => updateMotion("durationBaseMs", m.ms)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono font-bold border-2 border-brand-ink transition-all cursor-pointer text-center",
                            theme.motion.durationBaseMs === m.ms
                              ? "bg-brand-yellow text-brand-ink shadow-neo-sm"
                              : "bg-brand-white hover:bg-neutral-100"
                          )}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center justify-between cursor-pointer p-2 bg-brand-cream border border-brand-ink">
                      <div>
                        <span className="font-display font-bold text-xs uppercase text-brand-ink block">
                          Reduced Motion Override
                        </span>
                        <span className="font-mono text-[10px] text-neutral-600">
                          {prefersReducedMotion ? "Spatial translates disabled" : "Full mechanical spring physics"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={theme.motion.reducedMotion}
                        onChange={(e) => updateMotion("reducedMotion", e.target.checked)}
                        className="w-4 h-4 accent-brand-pink"
                      />
                    </label>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-neutral-600 font-bold block mb-1.5">
                      Page Transition Style:
                    </span>
                    <div className="flex items-center gap-2">
                      {(["slide", "fade", "none"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateMotion("pageTransitionStyle", s)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono font-bold uppercase border-2 border-brand-ink transition-all cursor-pointer text-center",
                            theme.motion.pageTransitionStyle === s
                              ? "bg-brand-pink text-brand-ink shadow-neo-sm"
                              : "bg-brand-white hover:bg-neutral-100"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Live Interactive Sandbox with Active Custom CSS Variables */}
            <div
              style={cssVariables as React.CSSProperties}
              className="p-6 sm:p-8 bg-[var(--bg-base)] border-3 border-[var(--border-color-default)] shadow-[var(--shadow-base)] rounded-[var(--radius-sm)] transition-all space-y-6"
            >
              <div className="flex items-center justify-between border-b-2 border-brand-ink pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-brand-pink rounded-full border border-brand-ink" />
                  <span className="font-display font-extrabold text-sm uppercase tracking-wide text-brand-ink">
                    LIVE THEME & MOTION SANDBOX PREVIEW
                  </span>
                </div>
                <Badge variant="dark" shape="square" className="text-[10px] font-mono">
                  ISOLATED DEV CONTEXT
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[var(--bg-surface)] border-[var(--border-width-base)] border-[var(--border-color-default)] shadow-[var(--shadow-base)] rounded-[var(--radius-sm)] space-y-3">
                  <span className="font-display font-bold text-xs uppercase text-neutral-500">
                    Interactive Buttons
                  </span>
                  <div className="flex flex-col gap-2">
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      PRIMARY ACTION
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full justify-center">
                      SECONDARY ACCENT
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-surface)] border-[var(--border-width-base)] border-[var(--border-color-default)] shadow-[var(--shadow-base)] rounded-[var(--radius-sm)] space-y-3">
                  <span className="font-display font-bold text-xs uppercase text-neutral-500">
                    Badges & Indicators
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="pink">NEW DROP</Badge>
                    <Badge variant="yellow">BESTSELLER</Badge>
                    <Badge variant="blue">HANDLOOM</Badge>
                    <Badge variant="dark">LIMITED</Badge>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-surface)] border-[var(--border-width-base)] border-[var(--border-color-default)] shadow-[var(--shadow-base)] rounded-[var(--radius-sm)] space-y-3">
                  <span className="font-display font-bold text-xs uppercase text-neutral-500">
                    Form Control
                  </span>
                  <Input placeholder="Type to test active shadow..." className="text-xs" />
                </div>

                <div className="p-4 bg-[var(--bg-surface)] border-[var(--border-width-base)] border-[var(--border-color-default)] shadow-[var(--shadow-base)] rounded-[var(--radius-sm)] space-y-3">
                  <span className="font-display font-bold text-xs uppercase text-neutral-500">
                    Dialog & Drawer Triggers
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setModalOpen(true)}
                      className="flex-1 justify-center text-xs"
                    >
                      MODAL
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDrawerOpen(true)}
                      className="flex-1 justify-center text-xs"
                    >
                      DRAWER
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: BUTTONS & ICONS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">01</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                BUTTONS & MICRO-INTERACTIONS
              </h2>
            </div>

            <Card thick className="p-6 bg-brand-white space-y-6">
              <div>
                <p className="font-display font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  STYLE VARIANTS (HOVER & ACTIVE PRESS DOWN PHYSICS)
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">PRIMARY PINK</Button>
                  <Button variant="secondary">SECONDARY YELLOW</Button>
                  <Button variant="accent">ACCENT BLUE</Button>
                  <Button variant="dark">DARK INK</Button>
                  <Button variant="outline">OUTLINE WHITE</Button>
                  <Button variant="ghost">GHOST TRANSPARENT</Button>
                </div>
              </div>

              <div>
                <p className="font-display font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  SIZES & ICONS
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" leadingIcon={<Sparkles className="w-3.5 h-3.5" />}>
                    SMALL
                  </Button>
                  <Button size="md" trailingIcon={<ArrowRight className="w-4 h-4" />}>
                    MEDIUM (DEFAULT)
                  </Button>
                  <Button size="lg" leadingIcon={<Heart className="w-5 h-5" />}>
                    LARGE BUTTON
                  </Button>
                  <Button size="icon" aria-label="Search icon button">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <p className="font-display font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  STATES & BEHAVIORS
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    isLoading={buttonLoading}
                    onClick={() => {
                      setButtonLoading(true);
                      setTimeout(() => setButtonLoading(false), 2000);
                    }}
                  >
                    {buttonLoading ? "PROCESSING..." : "TEST LOADING SPINNER"}
                  </Button>

                  <Button disabled>DISABLED BUTTON</Button>

                  <Button href="#navigation" variant="outline" leadingIcon={<ExternalLink className="w-4 h-4" />}>
                    LINK AS BUTTON
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* SECTION 2: BADGES & CARDS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">02</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                BADGES & CARD COMPOSITION
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Badges Box */}
              <Card thick className="p-6 bg-brand-white space-y-5">
                <h3 className="font-display font-extrabold text-lg uppercase text-brand-ink">
                  BADGE COLORWAYS & SHAPES
                </h3>

                <div>
                  <p className="text-xs font-mono font-bold text-neutral-500 mb-2">BRAND PALETTE</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="pink">HOT PINK</Badge>
                    <Badge variant="yellow">ELECTRIC YELLOW</Badge>
                    <Badge variant="blue">COBALT BLUE</Badge>
                    <Badge variant="dark">INK BLACK</Badge>
                    <Badge variant="white">WHITE</Badge>
                    <Badge variant="cream">CREAM</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold text-neutral-500 mb-2">SEMANTIC STATUS</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">IN STOCK (SUCCESS)</Badge>
                    <Badge variant="warning">FEW UNITS (WARNING)</Badge>
                    <Badge variant="error">OUT OF STOCK (ERROR)</Badge>
                    <Badge variant="info">PRE-ORDER (INFO)</Badge>
                    <Badge variant="neutral">ARCHIVED (NEUTRAL)</Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono font-bold text-neutral-500 mb-2">SHAPES & SIZES</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge shape="square" size="sm">SQUARE SM</Badge>
                    <Badge shape="rounded" size="md">ROUNDED MD</Badge>
                    <Badge shape="pill" size="lg" icon={<Sparkles className="w-3.5 h-3.5" />}>
                      PILL LG WITH ICON
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Card Composition Box */}
              <Card thick className="bg-brand-white flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="yellow" shape="square">NEO-CARD</Badge>
                    <span className="text-xs font-mono text-neutral-500">COMPOSED</span>
                  </div>
                  <CardTitle>STRUCTURAL CARD COMPOSITION</CardTitle>
                  <CardDescription>
                    Composed with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter child primitives.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-body text-xs text-neutral-700">
                    Supports configurable borders (<code className="bg-neutral-100 px-1 font-mono">hairline, base, thick, heavy</code>), shadows (<code className="bg-neutral-100 px-1 font-mono">sm, base, md, lg, xl, pink, yellow, blue</code>), and solid background fills.
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-xs font-mono font-bold text-neutral-700">ZERO BLUR EDGES</span>
                  <Button variant="secondary" size="sm">ACTION</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* SECTION 3: FORM CONTROLS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">03</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                FORM PRIMITIVES & VALIDATION
              </h2>
            </div>

            <Card thick className="p-6 sm:p-8 bg-brand-white space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-neutral-200">
                <span className="font-display font-extrabold text-sm uppercase text-brand-ink">
                  INTERACTIVE FORM PREVIEW
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSimulateError((prev) => !prev)}
                >
                  {simulateError ? "CLEAR SIMULATED ERRORS" : "SIMULATE FORM ERRORS"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="FULL NAME"
                  required
                  error={simulateError ? "Please enter your legal name." : undefined}
                  helperText={!simulateError ? "As it appears on your shipping document." : undefined}
                >
                  <Input
                    placeholder="e.g. Kaushik Patel"
                    value={inputVal}
                    error={simulateError}
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                </FormField>

                <FormField
                  label="EMAIL ADDRESS"
                  required
                  error={simulateError ? "Invalid email address format." : undefined}
                >
                  <Input
                    type="email"
                    leadingIcon={<Mail className="w-4 h-4 text-neutral-500" />}
                    placeholder="you@vastramay.local"
                    error={simulateError}
                  />
                </FormField>

                <FormField label="FABRIC PREFERENCE">
                  <Select
                    value={selectVal}
                    onChange={(e) => setSelectVal(e.target.value)}
                    options={[
                      { label: "100% Pure Long-Staple Cotton", value: "cotton" },
                      { label: "Handloom Chanderi Silk", value: "chanderi" },
                      { label: "Woven Jacquard Blend", value: "jacquard" },
                      { label: "Linen-Silk Festive Edit", value: "linen" },
                    ]}
                  />
                </FormField>

                <FormField label="ORDER SPECIAL INSTRUCTIONS">
                  <Textarea
                    placeholder="Add custom measurements or delivery instructions..."
                    value={textareaVal}
                    maxLength={150}
                    showCharCount
                    onChange={(e) => setTextareaVal(e.target.value)}
                  />
                </FormField>
              </div>

              <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-3">CHECKBOX PREFERENCES</Label>
                  <div className="space-y-3">
                    <Checkbox
                      label="Subscribe to Insider Drops"
                      description="Early access to limited apparel drops."
                      checked={checkboxVal}
                      onChange={(e) => setCheckboxVal(e.target.checked)}
                    />
                    <Checkbox
                      label="Gift Wrap in Brutalist Box"
                      description="Zero plastic custom box packaging."
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3">SHIPPING SPEED (RADIO GROUP)</Label>
                  <RadioGroup value={radioVal} onValueChange={setRadioVal}>
                    <RadioItem
                      value="standard"
                      label="Standard Delivery"
                      description="3-5 business days (Free over ₹1,999)"
                    />
                    <RadioItem
                      value="express"
                      label="Express Air Cargo"
                      description="Next-day priority delivery (₹199)"
                    />
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3">SWITCH TOGGLES</Label>
                  <div className="space-y-4">
                    <Switch
                      label="SMS Order Notifications"
                      description="Receive real-time tracking links."
                      checked={switchVal}
                      onCheckedChange={setSwitchVal}
                    />
                    <Switch
                      label="Dark Room Preview Mode"
                      description="Emulate moody gallery lighting."
                    />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* SECTION 4: TOAST & ALERT SYSTEM */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">04</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                TOAST NOTIFICATIONS & ALERTS
              </h2>
            </div>

            <Card thick className="p-6 bg-brand-white space-y-6">
              <div>
                <p className="font-display font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  TRIGGER LIVE TOASTS (SUPPORTS STACKING, HOVER-PAUSE & DISMISS)
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      toast.success("Added to Bag!", {
                        description: "Cobalt Asymmetric Kurta (Size L) added.",
                      })
                    }
                  >
                    SUCCESS TOAST
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      toast.error("Item Out of Stock", {
                        description: "Selected size is temporarily unavailable.",
                      })
                    }
                  >
                    ERROR TOAST
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast.warning("Limited Stock Remaining", {
                        description: "Only 2 garments left in this size.",
                      })
                    }
                  >
                    WARNING TOAST
                  </Button>
                  <Button
                    variant="accent"
                    onClick={() =>
                      toast.info("Express Shipping Activated", {
                        description: "Your order qualifies for priority dispatch.",
                      })
                    }
                  >
                    INFO TOAST
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() =>
                      toast.custom("Coupon Code Applied", {
                        description: "Code BOLD15 saved you ₹450.",
                      })
                    }
                  >
                    CUSTOM TOAST
                  </Button>
                </div>
              </div>

              <div>
                <p className="font-display font-bold text-xs uppercase tracking-wider text-neutral-500 mb-3">
                  INLINE ALERT COMPONENT
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Alert variant="info" title="FESTIVE DROP SHIPPING NOTICE" dismissible>
                    Express delivery cutoff for Diwali orders is October 24th at 6:00 PM IST.
                  </Alert>
                  <Alert variant="success" title="HANDCRAFT CERTIFICATION">
                    All fabrics are certified handwoven by artisan cooperatives in Maheshwar and Chanderi.
                  </Alert>
                  <Alert variant="warning" title="FIT RECOMMENDATION" dismissible>
                    This Nehru jacket has an architectural boxy cut. Size down if you prefer a slim fit.
                  </Alert>
                  <Alert variant="error" title="CART EXPIRATION" dismissible>
                    Your reserved items will be released back to inventory in 4 minutes.
                  </Alert>
                </div>
              </div>
            </Card>
          </section>

          {/* SECTION 5: MODALS & DRAWERS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">05</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                MODALS, DRAWERS & CONFIRMATION
              </h2>
            </div>

            <Card thick className="p-6 bg-brand-white space-y-4">
              <p className="font-body text-sm text-neutral-700">
                All overlays feature full focus trapping, scroll locking with layout compensation, backdrop animation, escape key dismissal, and return-focus management.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  OPEN DEMO MODAL
                </Button>
                <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
                  OPEN CONFIRM DIALOG
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDrawerPlacement("right");
                    setDrawerOpen(true);
                  }}
                >
                  OPEN RIGHT DRAWER
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDrawerPlacement("left");
                    setDrawerOpen(true);
                  }}
                >
                  OPEN LEFT DRAWER
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDrawerPlacement("bottom");
                    setDrawerOpen(true);
                  }}
                >
                  OPEN BOTTOM DRAWER
                </Button>
              </div>
            </Card>
          </section>

          {/* SECTION 6: DROPDOWNS, POPOVERS & TOOLTIPS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">06</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                DROPDOWNS, POPOVERS & TOOLTIPS
              </h2>
            </div>

            <Card thick className="p-6 bg-brand-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Dropdown */}
                <div className="space-y-3">
                  <Label>DROPDOWN MENU</Label>
                  <DropdownMenu
                    trigger={
                      <Button variant="outline" trailingIcon={<Sliders className="w-4 h-4" />}>
                        SORT & FILTER
                      </Button>
                    }
                    items={[
                      { id: "1", label: "PRICE: LOW TO HIGH", onClick: () => toast.info("Sorted: Low to High") },
                      { id: "2", label: "PRICE: HIGH TO LOW", onClick: () => toast.info("Sorted: High to Low") },
                      { id: "3", label: "NEWEST ARRIVALS", onClick: () => toast.info("Sorted: Newest") },
                      "divider",
                      { id: "4", label: "CLEAR ALL FILTERS", destructive: true, icon: <Trash2 className="w-4 h-4" />, onClick: () => toast.warning("Filters reset") },
                    ]}
                  />
                </div>

                {/* Popover */}
                <div className="space-y-3">
                  <Label>POPOVER BUBBLE</Label>
                  <Popover
                    trigger={
                      <Button variant="secondary" leadingIcon={<Info className="w-4 h-4" />}>
                        FABRIC SPECS
                      </Button>
                    }
                  >
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-sm uppercase text-brand-ink">
                        CHANDERI SILK COTTON
                      </h4>
                      <p className="font-body text-xs text-neutral-600 leading-relaxed">
                        Handwoven with 70% Mulberry silk warp and 30% fine long-staple cotton weft. Unmatched breathability with high tensile sheen.
                      </p>
                    </div>
                  </Popover>
                </div>

                {/* Tooltip */}
                <div className="space-y-3">
                  <Label>ACCESSIBLE TOOLTIP</Label>
                  <div className="pt-1">
                    <Tooltip content="7-Day Doorstep Exchange Policy">
                      <Button variant="dark" size="sm" leadingIcon={<HelpCircle className="w-4 h-4" />}>
                        HOVER / FOCUS FOR DETAILS
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* SECTION 7: TABS & ACCORDION */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">07</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                TABS & ACCORDION DISCLOSURES
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tabs */}
              <div className="space-y-3">
                <Label>PILL & CARD TABS WITH ARROW KEYBOARD CYCLING</Label>
                <Tabs
                  tabs={[
                    {
                      id: "overview",
                      label: "Overview",
                      content: (
                        <p className="leading-relaxed">
                          Vastramay redefines celebratory menswear and womenswear with unapologetic structural cuts, bold drop-shoulders, and high-contrast neo-brutalist detailing.
                        </p>
                      ),
                    },
                    {
                      id: "care",
                      label: "Care Guide",
                      content: (
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          <li>Dry clean only for woven jacquards.</li>
                          <li>Cold water gentle wash for slub cottons.</li>
                          <li>Do not tumble dry; line dry in shade.</li>
                        </ul>
                      ),
                    },
                    {
                      id: "shipping",
                      label: "Shipping",
                      content: (
                        <p className="leading-relaxed">
                          All orders are processed within 24 hours. Express air cargo takes 2-3 business days across all metro zones in India.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>

              {/* Accordion */}
              <div className="space-y-3">
                <Label>ACCORDION FAQ (EXPANDABLE PANELS)</Label>
                <Accordion
                  type="single"
                  defaultExpanded={["faq-1"]}
                  items={[
                    {
                      id: "faq-1",
                      title: "HOW DOES VASTRAMAY SIZING WORK?",
                      content:
                        "Our kurtas and jackets feature a relaxed, contemporary structural silhouette. If you are between sizes, we recommend ordering your true chest measurement for an architectural drape.",
                    },
                    {
                      id: "faq-2",
                      title: "WHAT IS YOUR RETURN & EXCHANGE POLICY?",
                      content:
                        "We offer a 7-day hassle-free doorstep exchange policy. If an item doesn't fit or meet your expectations, schedule an instant pickup from your order dashboard.",
                    },
                    {
                      id: "faq-3",
                      title: "DO YOU SHIP INTERNATIONALLY?",
                      content:
                        "Yes! We ship worldwide via DHL Express. International delivery takes 4-7 business days depending on customs clearance.",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* SECTION 8: SKELETONS, SPINNERS & EMPTY/ERROR STATES */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">08</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                FEEDBACK, PROGRESS & LOADING STATES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Spinner & Progress */}
              <Card thick className="p-6 bg-brand-white space-y-4">
                <Label>GEOMETRIC SPINNERS & PROGRESS</Label>
                <div className="flex items-center gap-4">
                  <Spinner size="sm" color="pink" />
                  <Spinner size="md" color="yellow" />
                  <Spinner size="lg" color="blue" />
                  <Spinner size="xl" color="ink" />
                </div>

                <div className="pt-2 space-y-3">
                  <Progress value={75} showLabel color="pink" />
                  <Progress value={45} color="yellow" />
                  <Progress value={90} color="blue" />
                </div>
              </Card>

              {/* Skeletons */}
              <Card thick className="p-6 bg-brand-white space-y-3">
                <Label>SKELETON PLACEHOLDERS</Label>
                <Skeleton bordered className="h-28 w-full" />
                <Skeleton bordered className="h-5 w-3/4" />
                <Skeleton bordered className="h-4 w-1/2" />
              </Card>

              {/* Pagination Demo */}
              <Card thick className="p-6 bg-brand-white space-y-4 flex flex-col justify-between">
                <div>
                  <Label>PAGINATION SYSTEM</Label>
                  <p className="text-xs text-neutral-600 mt-1 mb-4">
                    Current Page: <span className="font-bold text-brand-ink">{currentPage}</span> of 8
                  </p>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={8}
                  onPageChange={setCurrentPage}
                />
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <EmptyState
                title="YOUR BAG IS EMPTY"
                description="You haven't added any garments from the neo-heritage drop to your order yet."
                action={<Button variant="primary">START EXPLORING</Button>}
              />

              <ErrorState
                title="FAILED TO RETRIEVE INVENTORY"
                description="Unable to reach the apparel inventory service. Check your connection or retry."
                error="HTTP 503: Service temporarily unavailable"
                onRetry={() => toast.info("Retrying inventory sync...")}
              />
            </div>
          </section>

          {/* SECTION 9: PRODUCT CARD WITH FUNCTIONAL QUICK VIEW */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-brand-ink pb-3">
              <Badge variant="pink">09</Badge>
              <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                PRODUCT CARD & FUNCTIONAL QUICK VIEW
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                product={demoProduct}
                priority
                onQuickView={(p) => setQuickViewProduct(p)}
                onWishlistToggle={(id) => toast.success(`Wishlist updated for ${id}`)}
              />

              <div className="md:col-span-2 space-y-4">
                <Card thick className="p-6 bg-brand-white space-y-3">
                  <h3 className="font-display font-extrabold text-lg uppercase text-brand-ink">
                    PRODUCT CARD CAPABILITIES VERIFIED
                  </h3>
                  <ul className="text-xs font-mono space-y-2 text-neutral-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <strong>Stable Aspect Ratio (3:4):</strong> Prevents Cumulative Layout Shift (CLS).
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <strong>Interactive Wishlist:</strong> Heart icon toggle with filled state and event bubbling isolation.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <strong>Functional Quick View:</strong> Clicking &quot;Quick View&quot; triggers modal preview with full product details.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <strong>Image Fallback State:</strong> Displays geometric unavailable frame if image fails to load.
                    </li>
                  </ul>
                </Card>

                <Card thick className="p-6 bg-brand-yellow space-y-2">
                  <h4 className="font-display font-extrabold text-sm uppercase text-brand-ink">
                    PRICE TAG TEST MATRIX
                  </h4>
                  <div className="flex flex-wrap items-center gap-6">
                    <PriceTag price={2499} originalPrice={3999} size="sm" />
                    <PriceTag price={3899} originalPrice={5499} size="md" />
                    <PriceTag price={12499} originalPrice={18999} size="lg" />
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </Container>
      </div>

      {/* MODAL INSTANCE */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <ModalHeader>
          <ModalTitle>NEO-BRUTALIST MODAL WINDOW</ModalTitle>
          <ModalDescription>
            Traps focus, locks body scroll, handles Escape key, and returns focus to the trigger on close.
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <p className="leading-relaxed">
            This modal is engineered using Next.js 16 and Motion spring animations, with strict focus trapping and zero-blur graphic drop shadow.
          </p>
          <FormField label="YOUR FEEDBACK">
            <Input placeholder="Enter your thoughts..." />
          </FormField>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setModalOpen(false);
              toast.success("Feedback submitted!");
            }}
          >
            SUBMIT ACTION
          </Button>
        </ModalFooter>
      </Modal>

      {/* CONFIRM DIALOG INSTANCE */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          toast.error("Cart item removed!");
        }}
        isDestructive
        title="REMOVE ITEM FROM BAG?"
        description="Are you sure you want to remove the Cobalt Asymmetric Mandarin Kurta from your shopping bag?"
        confirmLabel="YES, REMOVE"
        cancelLabel="KEEP ITEM"
      />

      {/* DRAWER INSTANCE */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement={drawerPlacement}
      >
        <DrawerHeader>
          <DrawerTitle>{drawerPlacement.toUpperCase()} DRAWER PANEL</DrawerTitle>
          <DrawerDescription>
            Smooth slide transition with scroll locking and backdrop dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-4">
          <p className="text-neutral-700 leading-relaxed">
            Drawers can be used for mini-carts, mobile category navigation, and filter sidebars.
          </p>
          <div className="p-4 bg-brand-cream border-2 border-brand-ink space-y-2">
            <h5 className="font-display font-bold text-xs uppercase">ACTIVE PLACEMENT</h5>
            <div className="flex gap-2">
              <Button size="sm" variant={drawerPlacement === "left" ? "primary" : "outline"} onClick={() => setDrawerPlacement("left")}>LEFT</Button>
              <Button size="sm" variant={drawerPlacement === "right" ? "primary" : "outline"} onClick={() => setDrawerPlacement("right")}>RIGHT</Button>
              <Button size="sm" variant={drawerPlacement === "bottom" ? "primary" : "outline"} onClick={() => setDrawerPlacement("bottom")}>BOTTOM</Button>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="dark" fullWidth onClick={() => setDrawerOpen(false)}>
            CLOSE DRAWER
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* QUICK VIEW MODAL INSTANCE */}
      {quickViewProduct && (
        <Modal
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
          size="lg"
        >
          <ModalHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="pink" size="sm">{quickViewProduct.gender}</Badge>
              <Badge variant="yellow" size="sm">{quickViewProduct.category}</Badge>
            </div>
            <ModalTitle>{quickViewProduct.title}</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <PriceTag
              price={quickViewProduct.price}
              originalPrice={quickViewProduct.originalPrice}
              size="lg"
            />
            <p className="text-neutral-700 leading-relaxed">
              {quickViewProduct.description}
            </p>
            <div className="space-y-1">
              <span className="font-display font-bold text-xs uppercase text-neutral-500">
                AVAILABLE SIZES
              </span>
              <div className="flex gap-2">
                {quickViewProduct.variants.map((v) => (
                  <span
                    key={v.id}
                    className="px-3 py-1 bg-brand-white border-2 border-brand-ink font-display font-bold text-xs shadow-neo-sm"
                  >
                    {v.size}
                  </span>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setQuickViewProduct(null)}>
              CONTINUE BROWSING
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setQuickViewProduct(null);
                toast.success(`Added ${quickViewProduct.title} to bag!`);
              }}
            >
              ADD TO BAG
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
