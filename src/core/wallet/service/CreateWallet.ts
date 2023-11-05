import { Prisma } from "@prisma/client";
import UseCase from "../../shared/UseCase";
import UserRepository from "../../user/service/UserRepository";
import WalletRepository from "./WalletRepository";
import Wallet from "../model/Wallet";
import CustomError from "../../../adapters/errors/CustomError";
import TransactionRepository from "../../transaction/service/TransactionRepository";

type Input = {
    balance: number,
    userId: number;
};

export default class CreateWallet implements UseCase<Input, Wallet> {
    constructor(
        private readonly repository: WalletRepository,
        private readonly userRepository: UserRepository,
        private readonly transactionRepository: TransactionRepository
    ) { }

    async execute(data: Input): Promise<Wallet> {
        const { balance, userId } = data;

        const userExists = await this.userRepository.findById(userId);

        if (!userExists) {
            throw new CustomError(404, "User not found!");
        }

        const userHasWallet = await this.repository.findByUserId(userExists.id);

        if (userHasWallet) {
            throw new CustomError(409, "User already has a wallet!");
        }

        const wallet = await this.repository.create({
            userId
        });

        // Create transaction
        await this.transactionRepository.create({
            amount: new Prisma.Decimal(balance),
            walletId: wallet.id,
            type: 'BALANCE'
        }, wallet.id);

        return await this.repository.updateBalance(balance, wallet.id);
    }
}