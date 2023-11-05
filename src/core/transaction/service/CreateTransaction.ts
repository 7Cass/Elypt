import { Prisma } from "@prisma/client";
import CustomError from "../../../adapters/errors/CustomError";
import { TransactionTypes } from "../../shared/@types/Transaction";
import UseCase from "../../shared/UseCase";
import WalletRepository from "../../wallet/service/WalletRepository";
import Transaction from "../model/Transaction";
import TransactionRepository from "./TransactionRepository";

type Input = {
    amount: number;
    type: TransactionTypes;
    walletId: number;
};

export default class CreateTransaction implements UseCase<Input, Transaction> {
    constructor(
        private readonly repository: TransactionRepository,
        private readonly walletRepository: WalletRepository
    ) { }

    async execute(data: Input): Promise<Transaction> {
        const { amount, type, walletId } = data;

        if (!amount || !walletId) {
            throw new CustomError(400, "Missing either amount or walletId fields.");
        }

        const walletExists = await this.walletRepository.findById(walletId);

        if (!walletExists) {
            throw new CustomError(404, "Wallet not found.");
        }

        // Criar transaction
        const transaction = await this.repository.create({
            amount: new Prisma.Decimal(amount),
            type
        }, walletId);

        // @TODO: 
        // REFATORAR - 
        // BALANCE DEVE IR PRA updateBalance()
        // La deve ser feita a logica dos tipos
        const newBalance = Number(walletExists.balance) + amount;

        await this.walletRepository.updateBalance(newBalance, walletExists.id);

        return transaction;
    }

}