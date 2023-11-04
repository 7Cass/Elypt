import { Decimal } from "@prisma/client/runtime/library";
import User from "../../user/model/User";
import Transaction from "../../transaction/model/Transaction";

export default interface Wallet {
    id: number;
    balance: Decimal;
    userId: number;
    user: User;
    transactions: Transaction[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Transaction Types
 * 0 = Balance
 * 1 = Credit
 * 2 = Debt
 * 3 = Transfer
 */