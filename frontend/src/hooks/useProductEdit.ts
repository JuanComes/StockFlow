import { useState } from "react";
import { updateProduct } from "../services/product";
import type { Product } from "../interfaces/Product";

export const useProductEdit = (
  product: Product | undefined,
  loadProduct: () => Promise<void>,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSalePrice, setEditSalePrice] = useState(0);
  const [editMinimumStock, setEditMinimumStock] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState<number>();

  const handleSave = async () => {
    if (!product || editCategoryId === undefined) return;

    await updateProduct(product.id, {
      name: editName,
      description: product.description,
      sku: product.sku,
      sale_price: editSalePrice,
      stock: product.stock,
      minimum_stock: editMinimumStock,
      category_id: editCategoryId,
    });

    setIsEditing(false);
    await loadProduct();
  };

  const handleEdit = () => {
    if (!product) return;

    setEditName(product.name);
    setEditSalePrice(product.sale_price);
    setEditCategoryId(product.category_id);
    setEditMinimumStock(product.minimum_stock);

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
  };
};
