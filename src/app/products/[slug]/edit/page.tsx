import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "~/lib/db";
import Product from "~/models/product";
import ProductFormEdit from "~/components/ProductFormEdit";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Editar Producto | Beacon Health`,
    description: `Edita el producto ${slug} en el catálogo de salud`,
  };
}

export default async function EditProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  await dbConnect();
  const product = await Product.findOne({ slug }).lean<import("~/models/product").IProduct>();

  if (!product) notFound();

  const serialized = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    stock: product.stock,
    image: product.image,
    requiresPrescription: product.requiresPrescription,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href={`/products/${slug}`} className="text-sm text-blue-600 hover:underline">
          ← Volver al producto
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Modificar Producto</h1>
        <p className="mt-1 text-sm text-gray-500">
          Modifica los campos que desees para actualizar el producto en el catálogo.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductFormEdit product={serialized} />
      </div>
    </main>
  );
}
