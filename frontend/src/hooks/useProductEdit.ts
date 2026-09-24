import { useState } from "react";
import { updateProduct } from "../services/product";
import type { Product } from "../interfaces/Product";
import { validateProductEdit } from "../utils/validateProductEdit";

export const useProductEdit = (
  product: Product | undefined,
  loadProduct: () => Promise<void>,
) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editSalePrice, setEditSalePrice] = useState(0);
  const [editMinimumStock, setEditMinimumStock] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState<number>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!product) return;

    const validationError = validateProductEdit(
      editName,
      editSalePrice,
      editMinimumStock,
      editCategoryId,
    );

    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateProduct(product.id, {
        name: editName.trim(),
        description: product.description,
        sku: product.sku,
        sale_price: editSalePrice,
        stock: product.stock,
        minimum_stock: editMinimumStock,
        category_id: editCategoryId!,
      });

      await loadProduct();

      setIsEditing(false);
      setSuccess("Product updated successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (!product) return;

    setEditName(product.name);
    setEditSalePrice(product.sale_price);
    setEditCategoryId(product.category_id);
    setEditMinimumStock(product.minimum_stock);

    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  return {
    isEditing,

    editName,
    setEditName,

    editSalePrice,
    setEditSalePrice,

    editMinimumStock,
    setEditMinimumStock,

    editCategoryId,
    setEditCategoryId,

    handleEdit,
    handleSave,

    error,
    success,
    loading,
  };
};
