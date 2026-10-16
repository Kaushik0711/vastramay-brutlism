import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "@/config/site";

describe("Announcement Marquee Configuration Suite", () => {
  it("has valid, non-empty announcement items in siteConfig", () => {
    assert.ok(Array.isArray(siteConfig.announcements));
    assert.ok(siteConfig.announcements.length > 0);
    for (const item of siteConfig.announcements) {
      assert.equal(typeof item, "string");
      assert.ok(item.trim().length > 0);
    }
  });

  it("contains promotional copy for shipping, discounts, and brand value", () => {
    const text = siteConfig.announcements.join(" ");
    assert.match(text, /SHIPPING/i);
    assert.match(text, /₹1,999|1999/);
    assert.match(text, /DROP|EDIT|EXCHANGES/i);
    assert.match(text, /BOLD15/);
  });

  it("provides a primary announcement suitable for static reduced-motion display", () => {
    const primary = siteConfig.announcements[0];
    assert.ok(primary);
    assert.ok(primary.length > 10);
    assert.match(primary, /FREE EXPRESS SHIPPING/i);
  });
});
