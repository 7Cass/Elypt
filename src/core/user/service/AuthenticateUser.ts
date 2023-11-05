import { compare } from "bcryptjs";
import CustomError from "../../../adapters/errors/CustomError";
import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";
import jwt from "jsonwebtoken";

type Input = {
    email: string;
    password: string;
}

type Output = {
    access_token: string;
};

export default class AuthenticateUser implements UseCase<Input, Output> {
    constructor(private readonly repository: UserRepository) { }

    async execute(data: Input): Promise<Output> {
        const { email, password } = data;

        const userExists = await this.repository.findByEmail(email);

        if (!userExists) {
            throw new CustomError(404, "User not found.");
        }

        const isPasswordValid = await compare(password, userExists.password);

        if (!isPasswordValid) {
            throw new CustomError(404, "Invalid credentials.");
        }

        const access_token = jwt.sign(
            {
                sub: userExists.id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return {
            access_token
        };
    }
}