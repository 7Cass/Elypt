import { PrismaClient } from "@prisma/client";
import User from "../../core/user/model/User";
import UserRepository from "../../core/user/service/UserRepository";

export default class UserRepositoryPrismaPg implements UserRepository {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(user: User): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
    async findById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

}