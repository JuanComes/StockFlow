import express from "express";
import { pool } from "../db/database.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const client = await pool.connect();

  try {
    const { product_id, type, quantity } = req.body;

    await client.query("BEGIN");

    if (type === "IN") {
      await client.query(
        `
          UPDATE products
          SET stock = stock + $1
          WHERE id = $2
        `,
        [quantity, product_id]
      );

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
          error: "Stock insuficiente o producto inexistente"
        });
      }
    } else {
      await client.query("ROLLBACK");

      return res.status(400).json({
        error: "Tipo de movimiento inválido"
      });
    }

    const result = await client.query(
        `
          INSERT INTO stock_movements (
            product_id,
            type,
            quantity
          )
          VALUES ($1, $2, $3)
          RETURNING *
        `,
        [product_id, type, quantity]
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