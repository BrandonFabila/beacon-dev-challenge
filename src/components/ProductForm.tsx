"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createProduct } from "~/lib/actions";
import type { ProductCategory } from "~/models/product";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "medicamentos", label: "Medicamentos" },
  { value: "suplementos", label: "Suplementos" },
  { value: "cuidado-personal", label: "Cuidado Personal" },
  { value: "dispositivos-medicos", label: "Dispositivos Médicos" },
];

export default function ProductForm() {
  const [state, action, isPending] = useActionState(createProduct, {});

  return (
    <form action={action} className="space-y-6" noValidate>
      {state.error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ej: Ibuprofen 400mg Tablets"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Marca <span aria-hidden="true">*</span>
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            required
            placeholder="Ej: MediCore"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={state.fieldErrors?.brand ? "brand-error" : undefined}
          />
          {state.fieldErrors?.brand && (
            <p id="brand-error" role="alert" className="mt-1 text-xs text-red-600">
              {state.fieldErrors.brand}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio (USD) <span aria-hidden="true">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="0.00"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={state.fieldErrors?.price ? "price-error" : undefined}
          />
          {state.fieldErrors?.price && (
            <p id="price-error" role="alert" className="mt-1 text-xs text-red-600">
              {state.fieldErrors.price}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría <span aria-hidden="true">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue=""
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={
              state.fieldErrors?.category ? "category-error" : undefined
            }
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {state.fieldErrors?.category && (
            <p
              id="category-error"
              role="alert"
              className="mt-1 text-xs text-red-600"
            >
              {state.fieldErrors.category}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue="0"
            placeholder="0"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={state.fieldErrors?.stock ? "stock-error" : undefined}
          />
          {state.fieldErrors?.stock && (
            <p id="stock-error" role="alert" className="mt-1 text-xs text-red-600">
              {state.fieldErrors.stock}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            URL de imagen <span aria-hidden="true">*</span>
          </label>
          <input
            id="image"
            name="image"
            type="url"
            required
            placeholder="https://placehold.co/400x400/..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-describedby={state.fieldErrors?.image ? "image-error" : undefined}
          />
          {state.fieldErrors?.image && (
            <p id="image-error" role="alert" className="mt-1 text-xs text-red-600">
              {state.fieldErrors.image}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          placeholder="Describe el producto, sus características y beneficios..."
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-describedby={
            state.fieldErrors?.description ? "description-error" : undefined
          }
        />
        {state.fieldErrors?.description && (
          <p
            id="description-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.fieldErrors.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="requiresPrescription"
          name="requiresPrescription"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="requiresPrescription"
          className="text-sm font-medium text-gray-700"
        >
          Requiere prescripción médica
        </label>
      </div>

      <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Creando..." : "Crear Producto"}
        </button>
        <Link
          href="/products"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
