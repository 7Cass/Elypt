import CustomError from "../../../adapters/errors/CustomError";
import UseCase from "../../shared/UseCase";
import WalletRepository from "../../wallet/service/WalletRepository";
import Transaction from "../model/Transaction";
import TransactionRepository from "./TransactionRepository";

type Input = {
    walletId: number;
};

export default class FindAllTransactionsByWalletId implements UseCase<Input, Transaction[]> {
    constructor(
        private readonly repository: TransactionRepository,
        private readonly walletRepository: WalletRepository
    ) { }

    async execute(data: Input): Promise<Transaction[]> {
        const { walletId } = data;

        const walletExists = await this.walletRepository.findById(walletId);

        if (!walletExists) {
            throw new CustomError(404, "Wallet not found.");
        }

        return await this.repository.findAllByWalletId(walletId);
    }
}