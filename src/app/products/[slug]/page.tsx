import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import dbConnect from "~/lib/db";
import Product from "~/models/product";
import type { IProduct, ProductCategory } from "~/models/product";
import { formatPrice, formatCategory } from "~/lib/formatters";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  medicamentos: "bg-blue-100 text-blue-800",
  suplementos: "bg-green-100 text-green-800",
  "cuidado-personal": "bg-purple-100 text-purple-800",
  "dispositivos-medicos": "bg-orange-100 text-orange-800",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const product = await Product.findOne({ slug }).lean<IProduct>().exec();

  if (!product) {
    return { title: "Producto no encontrado | Beacon Health" };
  }

  return {
    title: `${product.name} | Beacon Health`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, width: 400, height: 400, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  await dbConnect();
  const product = await Product.findOne({ slug }).lean<IProduct>().exec();

  if (!product) notFound();

  const stockStatus =
    product.stock === 0
      ? { label: "Agotado", className: "bg-red-100 text-red-700" }
      : product.stock <= 10
        ? {
            label: `Solo ${product.stock} en stock`,
            className: "bg-yellow-100 text-yellow-700",
          }
        : {
            label: `${product.stock} en stock`,
            className: "bg-green-100 text-green-700",
          };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/products" className="hover:text-blue-600">
              Productos
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="max-w-xs truncate font-medium text-gray-900">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product image */}
        <div className="overflow-hidden rounded-2xl bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            unoptimized
            className="h-auto w-full object-contain p-8"
            priority
          />
        </div>

        {/* Product details */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              {product.requiresPrescription && (
                <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  Requiere Rx
                </span>
              )}
            </div>
            <p className="mt-1 text-base text-gray-500">{product.brand}</p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${CATEGORY_COLORS[product.category]}`}
          >
            {formatCategory(product.category)}
          </span>

          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${stockStatus.className}`}
          >
            {stockStatus.label}
          </span>

          <p className="text-base leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-auto border-t border-gray-200 pt-4">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Categoría</dt>
                <dd className="mt-0.5 font-medium text-gray-900">
                  {formatCategory(product.category)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Marca</dt>
                <dd className="mt-0.5 font-medium text-gray-900">
                  {product.brand}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Stock</dt>
                <dd className="mt-0.5 font-medium text-gray-900">
                  {product.stock} unidades
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Prescripción</dt>
                <dd className="mt-0.5 font-medium text-gray-900">
                  {product.requiresPrescription ? "Requerida" : "No requerida"}
                </dd>
              </div>
            </dl>
          </div>

          <Link
            href="/products"
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            ← Volver a productos
          </Link>

          <Link
            href={`/products/${slug}/edit`}
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            Editar producto
          </Link>
        </div>
      </div>
    </main>
  );
}
