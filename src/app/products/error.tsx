"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Error al cargar los productos
      </h2>
      <p className="mt-2 text-gray-500">
        {error.message || "Ocurrió un error inesperado. Inténtalo de nuevo."}
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
