import { describe, expect, it } from "vitest";
import { formatPrice, formatCategory, slugify } from "~/lib/formatters";

describe("formatPrice", () => {
  it("formats a price with USD currency symbol", () => {
    expect(formatPrice(8.99)).toBe("$8.99");
  });

  it("formats zero as $0.00", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("formats whole numbers with two decimal places", () => {
    expect(formatPrice(22)).toBe("$22.00");
  });
});

describe("formatCategory", () => {
  it("returns human-readable label for medicamentos", () => {
    expect(formatCategory("medicamentos")).toBe("Medicamentos");
  });

  it("returns human-readable label for cuidado-personal", () => {
    expect(formatCategory("cuidado-personal")).toBe("Cuidado Personal");
  });

  it("returns human-readable label for dispositivos-medicos", () => {
    expect(formatCategory("dispositivos-medicos")).toBe("Dispositivos Médicos");
  });
});

describe("slugify", () => {
  it("converts text to a URL-friendly slug", () => {
    expect(slugify("Vitamin D3 5000 IU")).toBe("vitamin-d3-5000-iu");
  });

  it("removes parentheses and special characters", () => {
    expect(slugify("Omega-3 (Fish Oil)")).toBe("omega-3-fish-oil");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("  Magnesium  ")).toBe("magnesium");
  });
});
