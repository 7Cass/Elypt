import { Prisma } from "@prisma/client";
import TransactionRepository from "../../core/transaction/service/TransactionRepository";
import WalletRepositoryInMemory from "./WalletRepositoryInMemory";
import Transaction from "../../core/transaction/model/Transaction";
import UserRepositoryInMemory from "./UserRepositoryInMemory";

export default class TransactionRepositoryInMemory implements TransactionRepository {
    private readonly transactions: Transaction[] = [];

    constructor(
        private readonly walletRepository: WalletRepositoryInMemory,
        private readonly userRepository: UserRepositoryInMemory
    ) { }

    async create(transaction: Partial<Transaction>, walletId: number): Promise<Transaction> {
        const user = await this.userRepository.create({
            id: Math.random(),
            name: 'Jon Doe',
            email: 'jondoe@mail.com',
            password: 'jondoe123',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const wallet = await this.walletRepository.create({
            id: Math.random(),
            balance: new Prisma.Decimal(2500.84),
            userId: user.id,
            transactions: [],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const newTransaction = {
            id: Math.random(),
            amount: new Prisma.Decimal(transaction?.amount || 0),
            type: transaction.type || "BALANCE",
            walletId,
            wallet,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.transactions.push(newTransaction);
        return newTransaction;
    }

    async findById(transactionId: number): Promise<Transaction | null> {
        return this.transactions.find(transaction => transaction.id === transactionId) ?? null;
    }

    async findAllByWalletId(walletId: number): Promise<Transaction[]> {
        return this.transactions.filter(transaction => transaction.walletId === walletId);
    }
}