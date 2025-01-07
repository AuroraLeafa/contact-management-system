import bcrypt from "bcrypt";
import { prismaClient } from "../src/app/db";


export class UsersUtil {
    static async delete(){
        await prismaClient.user.deleteMany({
            where:{
                username:"TestUser"
            }
        })
    }

    static async create(){
        await prismaClient.user.create({
            data:{
                username:"TestUser",
                password:bcrypt.hashSync("TestUser", 10),
                name:"TestUser",
                token:"token"
            }
        })
    }
}