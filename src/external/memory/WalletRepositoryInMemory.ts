import WalletRepository from "../../core/wallet/service/WalletRepository";
import Wallet from "../../core/wallet/model/Wallet";
import UserRepositoryInMemory from "./UserRepositoryInMemory";
import { Prisma } from "@prisma/client";
import CustomError from "../../adapters/errors/CustomError";

export default class WalletRepositoryInMemory implements WalletRepository {
    private readonly wallets: Wallet[] = [];

    constructor(
        private readonly userRepository: UserRepositoryInMemory
    ) { }

    async create(wallet: Partial<Wallet>): Promise<Wallet> {
        const user = await this.userRepository.create({
            id: Math.random(),
            name: 'Jon Doe',
            email: 'jondoe@mail.com',
            password: 'jondoe123',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const newWallet = {
            id: Math.random(),
            balance: new Prisma.Decimal(wallet?.balance || 0),
            userId: user.id,
            user,
            transactions: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.wallets.push(newWallet);
        return newWallet;
    }
    async findByUserId(userId: number): Promise<Wallet | null> {
        return this.wallets.find(wallet => wallet.userId === userId) ?? null;
    }
    async updateBalance(userId: number, amount: number, transactionType: number): Promise<Wallet> {
        const wallet = await this.findByUserId(userId);

        if (!wallet) {
            throw new CustomError(404, "Wallet not found!");
        }

        const balance = Number(wallet.balance) + amount
        wallet.balance = new Prisma.Decimal(balance);

        const walletIndex = this.wallets.findIndex(wallet => wallet.userId === userId);

        this.wallets[walletIndex] = wallet;

        return wallet;
    }
    async delete(userId: number): Promise<void> {
        const walletIndex = this.wallets.findIndex(wallet => wallet.userId === userId);

        if (!walletIndex) {
            throw new CustomError(404, "Wallet not found!");
        }

        this.wallets.splice(walletIndex, 1);
    }
}