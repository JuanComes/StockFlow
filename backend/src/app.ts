import express from "express";
import cors from "cors";

const app = express();

const PORT = 3000;

import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import stockMovementRoutes from "./routes/stockMovements.routes.js";

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running"
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/products", productRoutes);
  
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});