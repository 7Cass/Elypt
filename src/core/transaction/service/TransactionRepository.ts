import Transaction from "../model/Transaction";

export default interface TransactionRepository {
    create(transaction: Partial<Transaction>, walletId: number): Promise<Transaction>;
    findById(transactionId: number): Promise<Transaction | null>;
    findAllByWalletId(walletId: number): Promise<Transaction[]>;
}