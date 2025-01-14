import bcrypt from "bcrypt";
import { prismaClient } from "../src/app/db";
import { User } from "@prisma/client";

export class UsersUtil {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "TestUser",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "TestUser",
        name: "TestUser",
        password: bcrypt.hashSync("TestUser", 10),
        token: "token",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "TestUser",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
