import type { Metadata } from "next";
import Link from "next/link";
import ProductForm from "~/components/ProductForm";

export const metadata: Metadata = {
  title: "Nuevo Producto | Beacon Health",
  description: "Agrega un nuevo producto al catálogo de salud",
};

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/products" className="text-sm text-blue-600 hover:underline">
          ← Volver a productos
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Nuevo Producto</h1>
        <p className="mt-1 text-sm text-gray-500">
          Completa el formulario para agregar un producto al catálogo.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm />
      </div>
    </main>
  );
}
