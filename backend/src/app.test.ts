import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app.js";

describe("GET /api/health", () => {
  it("should return API status", async () => {
    const response = await request(app)
      .get("/api/health");

    expect(response.status).toBe(200);

    expect(response.body.status).toBe("ok");

    expect(response.body.message).toBe("API is running");
  });
});