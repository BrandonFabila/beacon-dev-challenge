import type { ProductCategory } from "~/models/product";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  medicamentos: "Medicamentos",
  suplementos: "Suplementos",
  "cuidado-personal": "Cuidado Personal",
  "dispositivos-medicos": "Dispositivos Médicos",
};

export function formatCategory(category: ProductCategory): string {
  return CATEGORY_LABELS[category];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
