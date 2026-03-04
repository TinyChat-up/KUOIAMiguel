import { ProductForm } from "@/components/forms/product-form";

export default function NewMarketplacePage() {
  return (
    <div className="mx-auto max-w-2xl py-6">
      <h1 className="mb-4 text-2xl font-bold">Publicar producto</h1>
      <ProductForm />
    </div>
  );
}
