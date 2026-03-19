import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import dbConnect from "~/lib/db";
import Product from "~/models/product";
import type { IProduct } from "~/models/product";
import SearchFilters from "~/components/SearchFilters";
import ProductCard from "~/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Productos | Beacon Health",
  description: "Explora nuestro catálogo de productos de salud y bienestar",
};

type SortKey = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_QUERY: Record<SortKey, Record<string, 1 | -1>> = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  "name-asc": { name: 1 },
  "name-desc": { name: -1 },
};

function isSortKey(value: string): value is SortKey {
  return value in SORT_QUERY;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;

  await dbConnect();

  const filter: Record<string, unknown> = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;

  const sortQuery =
    sort && isSortKey(sort)
      ? SORT_QUERY[sort]
      : ({ createdAt: -1 } as Record<string, 1 | -1>);

  const products = await Product.find(filter)
    .sort(sortQuery)
    .lean<IProduct[]>()
    .exec();

  const hasFilters = Boolean(q || category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length}{" "}
            {products.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        </div>
        <Link
          href="/products/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Agregar producto
        </Link>
      </div>

      <Suspense fallback={null}>
        <SearchFilters />
      </Suspense>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl font-medium text-gray-400">
            No se encontraron productos
          </p>
          {hasFilters && (
            <Link
              href="/products"
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Limpiar filtros
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
