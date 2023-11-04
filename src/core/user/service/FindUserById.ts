import CustomError from "../../../adapters/errors/CustomError";
import UseCase from "../../shared/UseCase";
import User from "../model/User";
import UserRepository from "./UserRepository";

type Input = {
    id: number;
}

export default class FindUserById implements UseCase<Input, User> {
    constructor(private readonly repository: UserRepository) { }

    async execute(data: Input): Promise<User> {
        const { id } = data;

        const user = await this.repository.findById(id);

        if (!user) {
            throw new CustomError(404, "User not found!");
        }

        return user;
    }
}