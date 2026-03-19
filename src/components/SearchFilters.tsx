"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useRef } from "react";
import type { ProductCategory } from "~/models/product";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "medicamentos", label: "Medicamentos" },
  { value: "suplementos", label: "Suplementos" },
  { value: "cuidado-personal", label: "Cuidado Personal" },
  { value: "dispositivos-medicos", label: "Dispositivos Médicos" },
];

const SORT_OPTIONS = [
  { value: "", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre: A → Z" },
  { value: "name-desc", label: "Nombre: Z → A" },
];

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  function buildQuery(updates: Record<string, string>): string {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    return params.toString();
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      router.push(`${pathname}?${buildQuery({ q: value })}`);
    }, 400);
  }

  function handleSelectChange(key: string, value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    router.push(`${pathname}?${buildQuery({ [key]: value })}`);
  }

  return (
    <div
      className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      role="search"
      aria-label="Filtros de productos"
    >
      <input
        type="search"
        placeholder="Buscar por nombre..."
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:max-w-xs"
        aria-label="Buscar productos por nombre"
      />

      <select
        value={searchParams.get("category") ?? ""}
        onChange={(e) => handleSelectChange("category", e.target.value)}
        className="h-10 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => handleSelectChange("sort", e.target.value)}
        className="h-10 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label="Ordenar productos"
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
