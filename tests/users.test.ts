import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import supertest from "supertest";
import { UsersUtil } from "./users-util";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UsersUtil.delete();
  });

  it("should create a new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "TestUser",
      password: "TestUser",
      name: "TestUser",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("TestUser");
    expect(response.body.data.name).toBe("TestUser");
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

  // it("should reject new user if user already exists", () => {});
});

describe("LOGIN /api/users/login", () => {
  beforeEach(async () => {
    await UsersUtil.create();
  });

  afterEach(async () => {
    await UsersUtil.delete();
  });

  it("should login user", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "TestUser",
      password: "TestUser",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("TestUser");
    expect(response.body.data.name).toBe("TestUser");
    expect(response.body.data.token).toBeDefined;
  });

  it("Should reject login if user not found/wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "Salah",
      password: "TestUser",
    });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined;
  });

  it("should reject login user if username/password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "TestUser",
      password: "Salah",
    });
    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined;
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UsersUtil.create();
  });

  afterEach(async () => {
    await UsersUtil.delete();
  });

  it("Should be able to get current user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "token");

      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("TestUser");
      expect(response.body.data.name).toBe("TestUser");
  })

  it("Should not be able to get current user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "Test");

      logger.debug(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBe("Unauthorized");
  })
})