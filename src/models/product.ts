import mongoose from "mongoose";

export type ProductCategory =
  | "medicamentos"
  | "suplementos"
  | "cuidado-personal"
  | "dispositivos-medicos";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: string;
  stock: number;
  image: string;
  requiresPrescription: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["medicamentos", "suplementos", "cuidado-personal", "dispositivos-medicos"],
    },
    brand: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    image: { type: String, required: true },
    requiresPrescription: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const Product =
  (mongoose.models.Product as mongoose.Model<IProduct>) ??
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
