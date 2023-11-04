import { Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionTypes } from "../../shared/@types/Transaction";

export default interface Transaction {
    id: number;
    type: TransactionTypes;
    amount: Decimal;
    wallet?: Wallet;
    walletId: number;
    createdAt: Date;
    updatedAt: Date;
};