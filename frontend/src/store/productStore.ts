import { create } from "zustand";
import { getProducts as getProductsService } from "../services/product";
import type { Product } from "../interfaces/Product";

interface ProductStore {
  products: Product[];
  getProducts: () => Promise<void>;

  page: number;
  productsPerPage: number;

  setPage: (page: number) => void;
  setProductsPerPage: (productsPerPage: number) => void;

  getStartIndex: () => number;
  getEndIndex: () => number;
  getTotalPages: (amountOfProducts: number) => number;
  nextPage: (totalPages: number) => void;
  previousPage: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  productsPerPage: 3,
  page: 1,

  getProducts: async () => {
    const data = await getProductsService();

    set({ products: data });
  },

  setPage: (page) => {
    set({ page });
  },

  setProductsPerPage: (productsPerPage) => {
    set({ productsPerPage });
  },

  getStartIndex: () => {
    const { page, productsPerPage } = get();

    return (page - 1) * productsPerPage;
  },

  getEndIndex: () => {
    const { page, productsPerPage } = get();

    return page * productsPerPage;
  },

  getTotalPages: (amountOfProducts) => {
    const { productsPerPage } = get();

    return Math.max(1, Math.ceil(amountOfProducts / productsPerPage));
  },

  previousPage: () => {
    const { page } = get();

    if (page <= 1) return;

    set({ page: page - 1 });
  },

  nextPage: (totalPages) => {
    const { page } = get();

    if (page >= totalPages) return;

    set({ page: page + 1 });
  },
}));
