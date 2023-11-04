import Wallet from "../model/Wallet";

export default interface WalletRepository {
    create(wallet: Partial<Wallet>): Promise<Wallet>;
    findById(walletId: number): Promise<Wallet | null>;
    findByUserId(userId: number): Promise<Wallet | null>;
    delete(userId: number): Promise<void>;
}