import Wallet from "../model/Wallet";

export default interface WalletRepository {
    create(wallet: Partial<Wallet>): Promise<Wallet>;
    findById(walletId: number): Promise<Wallet | null>;
    findByUserId(userId: number): Promise<Wallet | null>;
    updateBalance(newBalance: number, walletId: number): Promise<Wallet>;
    delete(userId: number): Promise<void>;
}