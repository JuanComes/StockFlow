export const validateProductEdit = (
  editName: string,
  editSalePrice: number,
  editMinimumStock: number,
  editCategoryId: number | undefined,
): string | null => {
  if (!editName.trim()) {
    return "Product name is required";
  }

  if (editSalePrice <= 0) {
    return "Sale Price must be above 0";
  }

  if (editMinimumStock < 0) {
    return "Minimum Stock cannot be negative";
  }

  if (editCategoryId === undefined) {
    return "Category is required";
  }

  return null;
};
