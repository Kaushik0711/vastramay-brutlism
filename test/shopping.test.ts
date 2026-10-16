import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createCartLineId,
  calculateCartSubtotal,
  calculateCartCount,
  validateCoupon,
  calculateDiscount,
  calculateShipping,
  calculateCartTotal,
  findMatchingVariant,
  sanitizePersistedCart,
  sanitizePersistedWishlist,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "@/lib/shopping";
import {
  getProductById,
  getProductBySlug,
  getProductsByGender,
  searchProducts,
  filterAndSortProducts,
} from "@/lib/products";
import type { CartItem, Product } from "@/types";

describe("Shopping & Cart Logic Suite", () => {
  describe("createCartLineId", () => {
    it("generates deterministic variant line id with sanitized size and color", () => {
      const id1 = createCartLineId("prod-1", " L ", " Midnight Blue ");
      const id2 = createCartLineId("prod-1", "l", "midnight-blue");
      assert.equal(id1, "prod-1::l::midnight-blue");
      assert.equal(id2, "prod-1::l::midnight-blue");
    });

    it("generates distinct line ids for different sizes of the same product", () => {
      const mId = createCartLineId("prod-1", "M", "Black");
      const lId = createCartLineId("prod-1", "L", "Black");
      assert.notEqual(mId, lId);
    });
  });

  describe("calculateCartSubtotal and calculateCartCount", () => {
    it("returns 0 for an empty cart", () => {
      assert.equal(calculateCartSubtotal([]), 0);
      assert.equal(calculateCartCount([]), 0);
    });

    it("correctly calculates price sum across multiple quantities", () => {
      const mockItems: CartItem[] = [
        {
          id: "item-1",
          productId: "p1",
          title: "Kurta",
          slug: "kurta",
          price: 2499,
          size: "M",
          colorName: "Ink",
          imageSrc: "/dummy.jpg",
          quantity: 2,
          maxStock: 5,
        },
        {
          id: "item-2",
          productId: "p2",
          title: "Jacket",
          slug: "jacket",
          price: 4999,
          size: "L",
          colorName: "Black",
          imageSrc: "/dummy.jpg",
          quantity: 1,
          maxStock: 3,
        },
      ];

      // 2499*2 + 4999 = 4998 + 4999 = 9997
      assert.equal(calculateCartSubtotal(mockItems), 9997);
      assert.equal(calculateCartCount(mockItems), 3);
    });

    it("sanitizes zero or negative quantities safely", () => {
      const item: CartItem = {
        id: "item-1",
        productId: "p1",
        title: "Kurta",
        slug: "kurta",
        price: 1500,
        size: "M",
        colorName: "Ink",
        imageSrc: "/dummy.jpg",
        quantity: -2,
        maxStock: 5,
      };
      // Math.max(1, -2) = 1 in calculateCartSubtotal
      assert.equal(calculateCartSubtotal([item]), 1500);
    });
  });

  describe("Coupons and Discounts", () => {
    it("validates BOLD15 case-insensitively", () => {
      const lower = validateCoupon("bold15");
      const upper = validateCoupon("BOLD15");
      const spaces = validateCoupon("  bold15  ");

      assert.ok(lower);
      assert.equal(lower?.code, "BOLD15");
      assert.equal(lower?.discountPercent, 15);
      assert.equal(upper?.code, "BOLD15");
      assert.equal(spaces?.code, "BOLD15");
    });

    it("rejects unknown coupon codes", () => {
      assert.equal(validateCoupon("INVALID99"), null);
      assert.equal(validateCoupon(""), null);
    });

    it("computes 15% discount rounded to nearest rupee", () => {
      // 1000 * 0.15 = 150
      assert.equal(calculateDiscount(1000, "BOLD15"), 150);
      // 2499 * 0.15 = 374.85 -> 375
      assert.equal(calculateDiscount(2499, "BOLD15"), 375);
    });

    it("returns 0 discount for invalid coupon or zero subtotal", () => {
      assert.equal(calculateDiscount(0, "BOLD15"), 0);
      assert.equal(calculateDiscount(2000, "FAKECODE"), 0);
      assert.equal(calculateDiscount(2000, null), 0);
    });
  });

  describe("Shipping Thresholds and Final Totals", () => {
    it("returns 0 shipping for empty cart", () => {
      assert.equal(calculateShipping(0), 0);
    });

    it(`charges standard shipping (${STANDARD_SHIPPING_FEE}) below threshold (${FREE_SHIPPING_THRESHOLD})`, () => {
      assert.equal(calculateShipping(1000), STANDARD_SHIPPING_FEE);
      assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD - 1), STANDARD_SHIPPING_FEE);
    });

    it(`unlocks free shipping at or above threshold (${FREE_SHIPPING_THRESHOLD})`, () => {
      assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD), 0);
      assert.equal(calculateShipping(5000), 0);
    });

    it("computes total = subtotal - discount + shipping, never below zero", () => {
      // Subtotal 1000, discount 150, shipping 199 = 1049
      assert.equal(calculateCartTotal(1000, 150, 199), 1049);
      // Subtotal 2500, discount 375, shipping 0 = 2125
      assert.equal(calculateCartTotal(2500, 375, 0), 2125);
      // Defensive clamp to 0
      assert.equal(calculateCartTotal(100, 500, 0), 0);
    });
  });

  describe("Variant Lookup & State Sanitization", () => {
    it("finds matching variant case-insensitively", () => {
      const mockProduct: Product = {
        id: "p1",
        title: "Test Kurta",
        slug: "test-kurta",
        description: "Desc",
        price: 2000,
        currency: "INR",
        gender: "men",
        category: "kurtas",
        tags: ["festive"],
        images: [{ src: "/img.jpg", alt: "Test" }],
        variants: [
          {
            id: "v1",
            sku: "SKU-M-BLUE",
            colorName: "Cobalt Blue",
            colorHex: "#0047AB",
            size: "M",
            stock: 4,
            inStock: true,
          },
        ],
      };

      const match = findMatchingVariant(mockProduct, "m", "cobalt blue");
      assert.ok(match);
      assert.equal(match?.id, "v1");

      const noMatch = findMatchingVariant(mockProduct, "XL", "cobalt blue");
      assert.equal(noMatch, undefined);
    });

    it("sanitizes persisted wishlist and removes invalid IDs", () => {
      const cleaned = sanitizePersistedWishlist(["nonexistent-xyz", "prod-1", 123, null]);
      assert.ok(Array.isArray(cleaned));
      assert.ok(!cleaned.includes("nonexistent-xyz"));
      // Valid ID in mock data is kept
      if (getProductById("prod-1")) {
        assert.ok(cleaned.includes("prod-1"));
      }
    });

    it("sanitizes persisted cart drops invalid payloads safely", () => {
      assert.deepEqual(sanitizePersistedCart(null as unknown as unknown[]), []);
      assert.deepEqual(sanitizePersistedCart(["random string", 42]), []);
    });
  });
});

describe("Catalog & Product Utilities Suite", () => {
  describe("Product Lookups", () => {
    it("finds products by known slug", () => {
      const p = getProductBySlug("cobalt-asymmetric-mandarin-kurta");
      assert.ok(p);
      assert.equal(p?.slug, "cobalt-asymmetric-mandarin-kurta");
      assert.equal(p?.currency, "INR");
    });

    it("returns undefined for unknown slug", () => {
      assert.equal(getProductBySlug("unknown-nonexistent-garment"), undefined);
    });

    it("finds products by known id", () => {
      const p = getProductById("prod-1");
      assert.ok(p);
      assert.equal(p?.id, "prod-1");
    });
  });

  describe("Gender & Category Partitioning", () => {
    it("partitions men products including unisex", () => {
      const menProducts = getProductsByGender("men");
      assert.ok(menProducts.length > 0);
      for (const p of menProducts) {
        assert.ok(p.gender === "men" || p.gender === "unisex");
      }
    });

    it("partitions women products including unisex", () => {
      const womenProducts = getProductsByGender("women");
      assert.ok(womenProducts.length > 0);
      for (const p of womenProducts) {
        assert.ok(p.gender === "women" || p.gender === "unisex");
      }
    });
  });

  describe("Search & Filtering", () => {
    it("matches query against title, category, or tags", () => {
      const results = searchProducts("kurta");
      assert.ok(results.length > 0);
      for (const r of results) {
        const matches =
          r.title.toLowerCase().includes("kurta") ||
          r.category.toLowerCase().includes("kurta") ||
          r.description.toLowerCase().includes("kurta") ||
          r.tags.some((t) => t.toLowerCase().includes("kurta"));
        assert.ok(matches);
      }
    });

    it("returns empty array for empty search query", () => {
      assert.deepEqual(searchProducts(""), []);
      assert.deepEqual(searchProducts("   "), []);
    });

    it("sorts products by price ascending correctly", () => {
      const sorted = filterAndSortProducts(
        [
          { price: 5000, id: "a", title: "A" } as Product,
          { price: 1500, id: "b", title: "B" } as Product,
          { price: 3200, id: "c", title: "C" } as Product,
        ],
        { sortBy: "price-asc" }
      );
      assert.equal(sorted[0].price, 1500);
      assert.equal(sorted[1].price, 3200);
      assert.equal(sorted[2].price, 5000);
    });

    it("sorts products by price descending correctly", () => {
      const sorted = filterAndSortProducts(
        [
          { price: 1500, id: "b", title: "B" } as Product,
          { price: 5000, id: "a", title: "A" } as Product,
          { price: 3200, id: "c", title: "C" } as Product,
        ],
        { sortBy: "price-desc" }
      );
      assert.equal(sorted[0].price, 5000);
      assert.equal(sorted[1].price, 3200);
      assert.equal(sorted[2].price, 1500);
    });
  });
});
