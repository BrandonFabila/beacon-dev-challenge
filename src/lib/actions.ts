"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "~/lib/db";
import Product from "~/models/product";
import { slugify } from "~/lib/formatters";
import type { ProductCategory } from "~/models/product";

const VALID_CATEGORIES: ProductCategory[] = [
  "medicamentos",
  "suplementos",
  "cuidado-personal",
  "dispositivos-medicos",
];

export type CreateProductState = {
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

export async function createProduct(
  _prevState: CreateProductState,
  formData: FormData,
): Promise<CreateProductState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const priceStr = formData.get("price")?.toString() ?? "";
  const category = formData.get("category")?.toString() as ProductCategory;
  const brand = formData.get("brand")?.toString().trim() ?? "";
  const stockStr = formData.get("stock")?.toString() ?? "0";
  const image = formData.get("image")?.toString().trim() ?? "";
  const requiresPrescription = formData.get("requiresPrescription") === "on";

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = "El nombre es requerido";
  if (!description) fieldErrors.description = "La descripción es requerida";

  const price = Number(priceStr);
  if (!priceStr || isNaN(price) || price < 0) {
    fieldErrors.price = "El precio debe ser un número positivo";
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    fieldErrors.category = "Selecciona una categoría válida";
  }

  if (!brand) fieldErrors.brand = "La marca es requerida";

  const stock = Number(stockStr);
  if (isNaN(stock) || stock < 0) {
    fieldErrors.stock = "El stock debe ser un número no negativo";
  }

  if (!image) fieldErrors.image = "La URL de imagen es requerida";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const slug = slugify(name);

  try {
    await dbConnect();
    await Product.create({
      name,
      slug,
      description,
      price,
      category,
      brand,
      stock,
      image,
      requiresPrescription,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("duplicate key") || message.includes("E11000")) {
      return {
        error:
          "Ya existe un producto con un nombre similar. Elige un nombre diferente.",
      };
    }
    return { error: "Error al crear el producto. Inténtalo de nuevo." };
  }

  revalidatePath("/products");
  redirect("/products");
}
