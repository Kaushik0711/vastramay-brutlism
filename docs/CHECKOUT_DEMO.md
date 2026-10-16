# Multi-Step Demo Checkout

This document explains the architecture, validation schema, step lifecycle, and simulated receipt screen for the checkout process at `/checkout`.

---

## 1. Principles & Safety Boundaries

1. **Frontend-Only Simulation**:
   - The checkout experience is completely operational without an external backend, payment gateway (Razorpay/Stripe), or database.
2. **Zero Sensitive Data Persistence**:
   - Customer shipping details, contact information, and mock card numbers are **never stored** in `localStorage`, cookies, or analytics.
   - Values exist only in React Hook Form component state during the active checkout session.
3. **Strict Validation**:
   - Form schemas use `Zod` and `@hookform/resolvers/zod` with step-by-step triggers (`trigger(["fullName", "phone", ...])`) before allowing step progression.
4. **Transparent Demo Notices**:
   - High-contrast warning alerts inform users that no real currency will be charged and no real goods will be dispatched.

---

## 2. Multi-Step Workflow

```
[ Step 1: Customer & Address ] ──(Validates)──> [ Step 2: Shipping Method ] ──(Validates)──> [ Step 3: Payment & Review ] ──(Submit)──> [ Simulated Receipt ]
```

### Step 1: Customer Contact & Shipping Address
- **Fields**:
  - First Name (`firstName`, min 2 characters)
  - Last Name (`lastName`, min 1 character)
  - Phone Number (`phone`, `/^[6-9]\d{9}$/` 10-digit Indian mobile number)
  - Email Address (`email`, valid email format for dispatch updates)
  - Complete Street Address (`address`, min 5 characters)
  - Apartment / Suite (`apartment`, optional)
  - City (`city`, min 2 characters)
  - State (`state`, dropdown select of 11 Indian states: MH, DL, KA, TN, TS, GJ, WB, RJ, UP, KL, PB)
  - PIN Code (`pincode`, `/^\d{6}$/` 6-digit Indian postal code)
- **Validation**: On clicking "CONTINUE TO SHIPPING", Step 1 fields are triggered via React Hook Form and Zod. If errors exist, field messages highlight with high-contrast borders and red alert text.

### Step 2: Shipping & Delivery Method
- **Options**:
  - **Standard Express** (`express`, 4-6 Business Days): Free on ₹1,999+, otherwise standard delivery fee ₹199.
  - **Priority Dispatch** (`priority`, 2-3 Business Days): Flat ₹199 surcharge.
- **Dynamic Fee Recalculation**: Selecting Priority Dispatch updates the shipping line item and total in the sticky order summary sidebar.

### Step 3: Payment Method & Order Placement
- **Simulated Options**:
  - **UPI / QR Code**: Interactive demo QR code display with mock UPI ID (`vastramay@okaxis`).
  - **Credit / Debit Card**: Mock card number, expiry, CVV fields with explicit "SIMULATED GATEWAY" banner.
  - **Net Banking**: Bank selection chips (HDFC, SBI, ICICI, Axis).
  - **Cash on Delivery (COD)**: Includes ₹50 verification charge notice.
- **Order Placement Button**:
  - Displays "PLACE DEMO ORDER (₹TOTAL)".
  - On submit:
    - Generates a unique order reference (e.g. `VASTRA-DEMO-7483`).
    - Takes a snapshot of the current cart lines and applied discounts.
    - Empties the cart (`clearCart()`).
    - Transitions to the Order Confirmation Receipt screen.

---

## 3. Order Confirmation & Simulated Receipt

When an order is placed, the checkout page renders a bold Neo-Brutalist receipt view:

- **Order Header**:
  - Neo-brutalist checkmark emblem.
  - Order Reference Code: `VASTRA-DEMO-XXXX` with a 1-click "COPY CODE" button.
  - Timestamp (e.g. `16 October 2026`).
- **Itemized Purchase Table**:
  - Product thumbnail, variant specs (Size, Color), item quantity, and line price.
- **Financial Breakdown**:
  - Subtotal, Coupon discount (if applied), Shipping charges, and Total Paid.
- **Customer & Delivery Details Card**:
  - Recipient Name, Phone, Email, and Full Address with PIN code.
  - Selected Delivery and Payment Methods.
- **Important Demo Disclaimer**:
  - Notice stating: *"This was a simulated transaction in the Vastramay neo-brutalism design environment. No real funds were debited, and no physical packages will be dispatched."*
- **Navigation CTAs**:
  - "CONTINUE BROWSING MEN'S" (`/men`)
  - "EXPLORE WOMEN'S COLLECTION" (`/women`)
