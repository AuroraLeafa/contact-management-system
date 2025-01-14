import bcrypt  from 'bcrypt';
import { logger } from "../src/app/logging";
import { web } from "../src/app/web";
import supertest from "supertest";
import { UsersUtil } from "./users-util";
import { response } from 'express';

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

    console.log(response.body)
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
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
    expect(response.body.data.token).toBeDefined();
  });

  it("Should reject login if user not found/wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "Salah",
      password: "TestUser",
    });
    logger.debug(response.body);
    console.log(response.body)
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject login user if username/password is wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "TestUser",
      password: "Salah",
    });
    logger.debug(response.body);
    console.log(response.body)
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
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
  });

  it("Should not be able to get current user if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "Test");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBe("Unauthorized");
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UsersUtil.create();
  });
  afterEach(async () => {
    await UsersUtil.delete();
  });

  it("Should reject update current user (INVALID)", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "token")
      .send({
        password: "",
        name: "",
      })
      logger.debug(response.body);
      console.log(response.body)
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
  });

  it("Should be able to update current user name", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "token")
      .send({
        name: "Ubah Nama",
      })
      logger.debug(response.body);
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe("Ubah Nama");
  });

  it("Should be able to update current user password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "token")
      .send({
        password: "Password Baru",
      })
      logger.debug(response.body);
      expect(response.status).toBe(200);

      const userPassword = await UsersUtil.get()
      expect(bcrypt.compareSync("Password Baru", userPassword.password)).toBe(true);
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UsersUtil.create();
  });
  afterEach(async () => {
    await UsersUtil.delete();
  });

  it("Should be able to logout current user", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "token");

    logger.debug(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UsersUtil.get()
    expect(user.token).toBe(null);
  })

  it("Should be reject to logout current user if token is invalid", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "token salah");

    logger.debug(response.body)
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
});
