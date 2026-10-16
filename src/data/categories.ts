import type { CategoryItem } from "@/types";

export const categories: CategoryItem[] = [
  {
    id: "cat-1",
    slug: "men-kurtas",
    name: "Kurtas & Bundis",
    gender: "men",
    description: "Crisp architectural silhouettes fused with pure Indian cottons and linens.",
    itemCount: 42,
    badge: "POPULAR",
  },
  {
    id: "cat-2",
    slug: "men-jackets",
    name: "Nehru Jackets",
    gender: "men",
    description: "Sharp tailoring, heavy woven jacquards, and structured Mandarin collars.",
    itemCount: 28,
  },
  {
    id: "cat-3",
    slug: "women-dresses",
    name: "Contemporary Robes & Dresses",
    gender: "women",
    description: "Maximalist proportions, asymmetrical hemlines, and electric contrast stitching.",
    itemCount: 36,
    badge: "TRENDING",
  },
  {
    id: "cat-4",
    slug: "women-sarees",
    name: "Neo-Drape Sarees",
    gender: "women",
    description: "Pre-stitched pleats and fluid silks reimagined for effortless movement.",
    itemCount: 19,
  },
  {
    id: "cat-5",
    slug: "unisex-oversized",
    name: "Street Kurtas & Over-Shirts",
    gender: "unisex",
    description: "Boxy drops, heavy canvas weaves, and functional utility pockets.",
    itemCount: 24,
    badge: "NEW",
  },
];
