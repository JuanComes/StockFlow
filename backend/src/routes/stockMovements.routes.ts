import express from "express";
import { pool } from "../db/database.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const client = await pool.connect();

  try {
    const {
      product_id,
      type,
      quantity,
      purchase_price
    } = req.body;

    if (
      type === "IN" &&
      (purchase_price === undefined || purchase_price < 0)
    ) {
      return res.status(400).json({
        error: "Purchase price is required for IN movements and cannot be negative"
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
        [quantity, product_id]
      );

      if (updateResult.rowCount === 0) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Product not found"
        });
      }

    } else if (type === "OUT") {
      const updateResult = await client.query(
        `
          UPDATE products
          SET stock = stock - $1
          WHERE id = $2
          AND stock >= $1
          RETURNING *
        `,
        [quantity, product_id]
      );

      if (updateResult.rowCount === 0) {
        await client.query("ROLLBACK");

        return res.status(400).json({
          error: "Insufficient stock or product not found"
        });
      }

    } else {
      await client.query("ROLLBACK");

      return res.status(400).json({
        error: "Invalid movement type. Must be 'IN' or 'OUT'."
      });
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
      [product_id, type, quantity, purchase_price]
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

export default router;