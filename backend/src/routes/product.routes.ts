import express from "express";
import { pool } from "../db/database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        products.id,
        products.name,
        products.sku,
        products.sale_price,
        products.stock,
        products.minimum_stock,
        categories.name AS category
      FROM products
      JOIN categories
        ON products.category_id = categories.id
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      description,
      sku,
      sale_price,
      stock,
      minimum_stock,
      category_id
    } = req.body;

    // Product Validation
    const error = validateProduct(
      name,
      sku,
      sale_price,
      stock,
      minimum_stock,
      category_id
    );

    if (error) {
      return res.status(400).json({
        error
      });
    }

    // Product Category Validation
    const exists = await categoryExists(category_id);

    if (!exists) {
      return res.status(400).json({
        error: "Category not found"
      });
    }

    // Product SKU Validation
    const skuExists = await productExistsBySku(sku);

    if (skuExists) {
      return res.status(400).json({
        error: "Product with this SKU already exists"
      });
    }

    // Insert Product
    const result = await pool.query(
      `
        INSERT INTO products (
          name,
          description,
          sku,
          sale_price,
          stock,
          minimum_stock,
          category_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [
        name,
        description,
        sku,
        sale_price,
        stock,
        minimum_stock,
        category_id
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT
          products.id,
          products.name,
          products.description,
          products.sku,
          products.sale_price,
          products.stock,
          products.minimum_stock,
          categories.name AS category
        FROM products
        JOIN categories
          ON products.category_id = categories.id
        WHERE products.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      sku,
      sale_price,
      stock,
      minimum_stock,
      category_id
    } = req.body;

    // Product Validation
    const error = validateProduct(
      name,
      sku,
      sale_price,
      stock,
      minimum_stock,
      category_id
    );

    if (error) {
      return res.status(400).json({
        error
      });
    }

    // Category Validation
    const CATEGORY_EXISTS = await categoryExists(category_id);

    if (!CATEGORY_EXISTS) {
      return res.status(400).json({
        error: "Category not found"
      });
    }

    const SKU_EXISTS = await productExistsBySku(sku, parseInt(id));

    if (SKU_EXISTS) {
      return res.status(400).json({
        error: "Product with this SKU already exists"
      });
    }

    const result = await pool.query(
      `
        UPDATE products
        SET
          name = $1,
          description = $2,
          sku = $3,
          sale_price = $4,
          stock = $5,
          minimum_stock = $6,
          category_id = $7
        WHERE id = $8
        RETURNING *
      `,
      [
        name,
        description,
        sku,
        sale_price,
        stock,
        minimum_stock,
        category_id,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM products
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;

function validateProduct(
  name: string,
  sku: string,
  sale_price: number,
  stock: number,
  minimum_stock: number,
  category_id: number
) {
  if (
    !name ||
    name.trim() === "" ||
    !sku ||
    sku.trim() === "" ||
    sale_price === undefined ||
    stock === undefined ||
    minimum_stock === undefined ||
    category_id === undefined
  ) {
    return "All required fields must be provided";
  }

    if (sale_price <= 0 || stock < 0 || minimum_stock < 0) {
      return "Sale price must be greater than 0, and stock values cannot be negative";
  }

  if (/^\d+$/.test(name)) {
    return "Name cannot contain only numbers";
  }

  return null;
}

async function categoryExists(category_id: number) {
  const result = await pool.query(
    `
      SELECT id
      FROM categories
      WHERE id = $1
    `,
    [category_id]
  );

  return result.rows.length > 0;
}

async function productExistsBySku(sku: string, productId?: number) {
  const result = await pool.query(
    `
      SELECT id
      FROM products
      WHERE sku = $1
      AND ($2 IS NULL OR id != $2)
    `,
    [sku, productId ?? null]
  );

  return result.rows.length > 0;
}