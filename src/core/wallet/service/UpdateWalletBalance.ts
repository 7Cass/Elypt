import CustomError from "../../../adapters/errors/CustomError";
import UseCase from "../../shared/UseCase";
import Wallet from "../model/Wallet";
import WalletRepository from "./WalletRepository";

type Input = {
    amount: number;
    walletId: number;
}

export default class UpdateWalletBalance implements UseCase<Input, Wallet> {
    constructor(
        private readonly repository: WalletRepository
    ) { }

    async execute(data: Input): Promise<Wallet> {
        const { amount, walletId } = data;

        const walletExists = await this.repository.findById(walletId);

        if (!walletExists) {
            throw new CustomError(404, "Wallet not found.");
        }

        return await this.repository.updateBalance(amount, walletId);
    }
}