import express from "express";
import { pool } from "../db/database.js";   

const router = express.Router();

// DELETE 
router.delete("/:id", async (req, res, next) => {
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

    // Check if the category was found and deleted
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;  

    // Category Validation
    const error = validateCategory(name);

    if (error) {
      return res.status(400).json({
        error
      }); 
    }

    // Unique Name Validation
    const exists = await uniqueNameCategory(name, Number(id));

    if (!exists) {
      return res.status(400).json({
        error: "Category name already exists"
      });
    }

    const result = await pool.query(
      `
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *
      `,
      [name, id]
    );

    // Check if the category was found and updated
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// READ BY ID
router.get("/:id", async (req, res, next) => {

  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT *
      FROM categories
      WHERE id = $1
    `, [id]);


    // check if the category was found and returned
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    // Category Validation
    const error = validateCategory(name);

    if (error) {
      return res.status(400).json({
        error
      });
    }

    // Unique Name Validation
    const exists = await uniqueNameCategory(name);

    if (!exists) {
      return res.status(400).json({
        error: "Category name already exists"
      });
    }

    const result = await pool.query(
      `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
      `,
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
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

export default router;

function validateCategory(name: string): string | null {
  if (!name) {
    return "Category name is required";
  }
  if (name.trim() === "") {
    return "Category name cannot be empty";
  }
  return null ;
}

async function uniqueNameCategory(
  name: string,
  categoryId?: number
): Promise<boolean> {
  const result = await pool.query(
    `
      SELECT id
      FROM categories
      WHERE name = $1
      AND ($2::integer IS NULL OR id != $2)
    `,
    [name, categoryId ?? null]
  );

  return result.rows.length === 0;
}