import CustomError from "../../../adapters/errors/CustomError";
import UseCase from "../../shared/UseCase";
import UserRepository from "./UserRepository";

type Input = {
    name: string;
    email: string;
    password: string;
}

export default class CreateUser implements UseCase<Input, void> {
    constructor(private readonly repository: UserRepository) { }

    async execute(data: Input): Promise<void> {
        const { name, email, password } = data;

        const userExists = await this.repository.findByEmail(email);

        if (userExists) {
            throw new CustomError(409, "User already exists!");
        }

        await this.repository.create({ name, email, password });
    }
}