import Image from "next/image";
import Link from "next/link";
import type { IProduct, ProductCategory } from "~/models/product";
import { formatPrice, formatCategory } from "~/lib/formatters";

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  medicamentos: "bg-blue-100 text-blue-800",
  suplementos: "bg-green-100 text-green-800",
  "cuidado-personal": "bg-purple-100 text-purple-800",
  "dispositivos-medicos": "bg-orange-100 text-orange-800",
};

type ProductCardProps = {
  product: Pick<
    IProduct,
    | "name"
    | "slug"
    | "price"
    | "category"
    | "brand"
    | "stock"
    | "image"
    | "requiresPrescription"
  >;
};

export default function ProductCard({ product }: ProductCardProps) {
  const stockStatus =
    product.stock === 0
      ? { label: "Agotado", className: "text-red-600" }
      : product.stock <= 10
        ? { label: `${product.stock} en stock`, className: "text-yellow-600" }
        : { label: `${product.stock} en stock`, className: "text-green-600" };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="overflow-hidden rounded-t-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          unoptimized
          className="h-auto w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
            {product.name}
          </h2>
          {product.requiresPrescription && (
            <span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
              Rx
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500">{product.brand}</p>

        <span
          className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[product.category]}`}
        >
          {formatCategory(product.category)}
        </span>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <span className={`text-xs font-medium ${stockStatus.className}`}>
            {stockStatus.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
