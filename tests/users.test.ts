import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import supertest from "supertest";

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "Aurora",
      password: "Leafa",
      name: "Reff",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("Aurora");
    expect(response.body.data.name).toBe("Reff");
  });

  it("should reject new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined;
  });

  it("should reject new user if user already exists", () => {});
});
