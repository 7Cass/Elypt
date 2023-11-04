import Wallet from "../model/Wallet";

export default interface WalletRepository {
    create(wallet: Partial<Wallet>): Promise<Wallet>;
    findById(walletId: number): Promise<Wallet | null>;
    findByUserId(userId: number): Promise<Wallet | null>;

    //@TODO: Refatorar para impletar table de transactions
    updateBalance(userId: number, amount: number, transactionType: number): Promise<Wallet>;

    delete(userId: number): Promise<void>;
}