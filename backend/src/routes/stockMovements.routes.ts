import express from "express";
import { pool } from "../db/database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        stock_movements.id,
        stock_movements.product_id,
        products.name AS product_name,
        stock_movements.type,
        stock_movements.quantity,
        stock_movements.purchase_price
      FROM stock_movements
      INNER JOIN products
        ON stock_movements.product_id = products.id
      ORDER BY stock_movements.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const client = await pool.connect();

  try {
    const { product_id, type, quantity, purchase_price } = req.body;

    // Stock Movement Validation
    const error = validateStockMovement(
      product_id,
      type,
      quantity,
      purchase_price,
    );

    if (error) {
      return res.status(400).json({
        error,
      });
    }

    await client.query("BEGIN");

    if (type === "IN") {
      const updateResult = await client.query(
        `
          UPDATE products
          SET stock = stock + $1
          WHERE id = $2
          RETURNING *
        `,
        [quantity, product_id],
      );

      if (updateResult.rowCount === 0) {
        await client.query("ROLLBACK");

        return res.status(404).json({
          error: "Product not found",
        });
      }
    } else if (type === "OUT") {
      const productResult = await client.query(
        `
          SELECT stock
          FROM products
          WHERE id = $1
          FOR UPDATE
        `,
        [product_id],
      );

      if (productResult.rows.length === 0) {
        await client.query("ROLLBACK");

        return res.status(404).json({
          error: "Product not found",
        });
      }

      if (productResult.rows[0].stock < quantity) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Insufficient stock",
        });
      }

      await client.query(
        `
          UPDATE products
          SET stock = stock - $1
          WHERE id = $2
        `,
        [quantity, product_id],
      );
    }

    const result = await client.query(
      `
        INSERT INTO stock_movements (
          product_id,
          type,
          quantity,
          purchase_price
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [product_id, type, quantity, purchase_price],
    );

    await client.query("COMMIT");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
});

router.get("/in", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM stock_movements
      WHERE type = 'IN'
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/out", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM stock_movements
      WHERE type = 'OUT'
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id/in", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT *
        FROM stock_movements
        WHERE product_id = $1
          AND type = 'IN'
        ORDER BY id DESC
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id/out", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT *
        FROM stock_movements
        WHERE product_id = $1
          AND type = 'OUT'
        ORDER BY id DESC
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT *
        FROM stock_movements
        WHERE product_id = $1
        ORDER BY id DESC
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

export default router;

function validateStockMovement(
  product_id: number,
  type: string,
  quantity: number,
  purchase_price?: number,
): string | null {
  if (!product_id) {
    return "Product ID is required";
  }

  if (!type) {
    return "Movement type is required";
  }

  if (type !== "IN" && type !== "OUT") {
    return "Invalid movement type";
  }

  if (quantity === undefined) {
    return "Quantity is required";
  }

  if (quantity <= 0) {
    return "Quantity must be greater than 0";
  }

  if (type === "IN" && purchase_price === undefined) {
    return "Purchase price is required for IN movements";
  }

  if (type === "OUT" && purchase_price !== undefined) {
    return "Purchase price is only allowed for IN movements";
  }

  if (type === "IN" && purchase_price !== undefined && purchase_price < 0) {
    return "Purchase price cannot be negative";
  }

  return null;
}
