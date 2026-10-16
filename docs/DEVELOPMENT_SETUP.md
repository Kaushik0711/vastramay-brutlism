# Development Setup & Workflow Guide

This guide provides instructions for setting up, running, testing, and developing the **Vastramay** frontend application.

---

## Prerequisites

- **Node.js**: `v20.x` or higher (verified on Node `v24.20.0`).
- **NPM**: `v10.x` or higher (verified on NPM `v12.1.0`).

---

## Installation

Clone the repository and install all dependencies:

```bash
cd vastramay
npm install
```

---

## Running the Application Locally

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application shell.

---

## Quality Checks & Validation

Run the following validation checks prior to committing changes:

### 1. Automated Unit Tests (Node 24 native test runner)
```bash
npm test
```
*Executes the 28-test suite covering cart calculations, coupons, shipping thresholds, variant line IDs, catalog filtering, and announcement bar configuration in < 150ms.*

### 2. TypeScript Strict Type Check
```bash
npx tsc --noEmit
```
*Ensures all component props, data models, and utility functions satisfy strict type definitions.*

### 3. ESLint
```bash
npm run lint
```
*Enforces Next.js App Router rules and React 19 hook guidelines.*

### 4. Production Build
```bash
npm run build
```
*Compiles the optimized production bundle with Turbopack, validates static prerendering, and checks SCSS/Tailwind compatibility.*

### 5. Production Preview
```bash
npm run start
```
*Serves the production build locally on port 3000.*

---

## Styling Architecture Guidelines

1. **Use Tailwind CSS for**:
   - Page layouts (`grid`, `flex`, `columns`).
   - Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
   - Standard margins, paddings, and alignment.
   - Text color and font family utilities (`font-display`, `text-brand-ink`).

2. **Use SCSS Modules for**:
   - Interactive button and card physics (`Button.module.scss`).
   - Marquee ticker keyframes (`AnnouncementBar.module.scss`).
   - Custom element-specific pseudo-classes (`::after`, `::before`).

3. **Use CSS Custom Properties (`src/styles/_tokens.scss`) for**:
   - All color codes, shadow definitions, border thicknesses, and transition curves.
   - Never hardcode raw hex codes inside inline Tailwind classes.
