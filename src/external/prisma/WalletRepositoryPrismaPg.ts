import { Prisma, PrismaClient } from "@prisma/client";
import Wallet from "../../core/wallet/model/Wallet";
import WalletRepository from "../../core/wallet/service/WalletRepository";
import CustomError from "../../adapters/errors/CustomError";

export default class WalletRepositoryPrismaPg implements WalletRepository {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(walletData: Partial<Wallet>): Promise<Wallet> {
        const { balance, userId } = walletData;

        if (!balance || !userId) {
            throw new CustomError(400, "Missing either balance or userId fields.");
        }

        return await this.prisma.wallet.create({
            data: {
                balance: new Prisma.Decimal(balance || 0),
                userId
            },
            include: { user: true, transactions: true }
        });
    }

    async findById(walletId: number): Promise<Wallet | null> {
        return await this.prisma.wallet.findUnique({
            where: {
                id: walletId
            },
            include: { user: true, transactions: true }
        });
    }

    async findByUserId(userId: number): Promise<Wallet | null> {
        const wallet = await this.prisma.wallet.findFirst({
            where: {
                userId
            },
            include: {
                user: true,
                transactions: true
            },
        });

        return wallet;
    }

    /**
     * @deprecated Remove after refactor
     * @todo Refactor this method and use Transaction instead.
     */
    async updateBalance(userId: number, amount: number, transactionType: number): Promise<Wallet> {
        const wallet = await this.findByUserId(userId);

        if (!wallet) {
            throw new CustomError(404, "Wallet not found!");
        }

        const newBalance = Number(wallet.balance) + amount;

        const updatedWallet = this.prisma.wallet.update({
            where: { id: wallet.id }, include: { user: true, transactions: true }, data: {
                balance: new Prisma.Decimal(newBalance)
            }
        });

        return updatedWallet;
    }

    async delete(userId: number): Promise<void> {
        const wallet = await this.findByUserId(userId);

        if (!wallet) {
            throw new CustomError(404, "Wallet not found!");
        }

        await this.prisma.wallet.delete({ where: { id: wallet.id } });
    }

}