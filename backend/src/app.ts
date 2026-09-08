import express from "express";
import { pool } from "./db/database.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/api/test-db", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get("/api/products", async (req, res, next) => {
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

app.post("/api/products", async (req, res, next) => {
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

app.get("/api/products/:id", async (req, res, next) => {
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

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});


app.put("/api/products/:id", async (req, res, next) => {
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

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/products/:id", async (req, res, next) => {
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

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
);

app.delete("/api/categories/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM categories
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.put("/api/categories/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;  

    const result = await pool.query(
      `
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *
      `,
      [name, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get("/api/categories/:id", async (req, res, next) => {

  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT *
      FROM categories
      WHERE id = $1
    `, [id]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.post("/api/categories", async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
      `,
      [name]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get("/api/categories", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM categories
      ORDER BY id
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});