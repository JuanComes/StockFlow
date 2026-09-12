import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app.js";

describe("GET /api/products", () => {
  it("should return all the products", async () => {
    const response = await request(app)
      .get("/api/products");

    expect(response.status).toBe(200);
  });
});

