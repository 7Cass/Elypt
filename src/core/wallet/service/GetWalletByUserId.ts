import { NotFoundError } from "elysia";
import UseCase from "../../shared/UseCase";
import Wallet from "../model/Wallet";
import WalletRepository from "./WalletRepository";
import CustomError from "../../../adapters/errors/CustomError";

type Input = {
    userId: number;
};

export default class GetWalletByUserId implements UseCase<Input, Wallet> {
    constructor(
        private readonly repository: WalletRepository
    ) { }

    async execute({ userId }: Input): Promise<Wallet> {
        const wallet = await this.repository.findByUserId(userId);

        if (!wallet) {
            throw new CustomError(404, "Wallet not found!");
        }

        return wallet;
    }
}