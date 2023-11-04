import { Prisma, PrismaClient } from "@prisma/client";
import Transaction from "../../core/transaction/model/Transaction";
import TransactionRepository from "../../core/transaction/service/TransactionRepository";
import CustomError from "../../adapters/errors/CustomError";

export default class TransactionRepositoryPrismaPg implements TransactionRepository {
    client: PrismaClient;
    constructor() {
        this.client = new PrismaClient();
    }

    async create(transaction: Partial<Transaction>, walletId: number): Promise<Transaction> {
        const { amount, type } = transaction;

        if (!amount) {
            throw new CustomError(400, "Missing amount field.");
        }

        const newTransaction = await this.client.transaction.create({
            data: {
                amount: new Prisma.Decimal(amount),
                type,
                walletId
            }
        });

        return newTransaction;
    }

    async findById(transactionId: number): Promise<Transaction | null> {
        return await this.client.transaction.findUnique({ where: { id: transactionId } });
    }

    async findAllByWalletId(walletId: number): Promise<Transaction[]> {
        return await this.client.transaction.findMany({ where: { walletId } });
    }
}