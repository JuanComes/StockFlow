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
      purchase_price,
      sale_price,
      stock,
      minimum_stock,
      category_id
    } = req.body;

    const result = await pool.query(
      `
        INSERT INTO products (
          name,
          description,
          sku,
          purchase_price,
          sale_price,
          stock,
          minimum_stock,
          category_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
      [
        name,
        description,
        sku,
        purchase_price,
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
          products.purchase_price,
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
      purchase_price,
      sale_price,
      stock,
      minimum_stock,
      category_id
    } = req.body;

    const result = await pool.query(
      `
        UPDATE products
        SET
          name = $1,
          description = $2,
          sku = $3,
          purchase_price = $4,
          sale_price = $5,
          stock = $6,
          minimum_stock = $7,
          category_id = $8
        WHERE id = $9
        RETURNING *
      `,
      [
        name,
        description,
        sku,
        purchase_price,
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

    if( result.rows.length === 0) {
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