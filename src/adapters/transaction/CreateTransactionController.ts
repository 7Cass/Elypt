import Elysia, { t } from "elysia";
import CreateTransaction from "../../core/transaction/service/CreateTransaction";
import { TransactionTypes } from "@prisma/client";

export default class CreateTransactionController {
    constructor(readonly server: Elysia, readonly useCase: CreateTransaction) {
        server.post('/transactions', async ({ body }) => {
            const { amount, type, walletId } = body as any;
            return await useCase.execute({ amount, type, walletId });
        }, {
            body: t.Object({
                amount: t.Numeric(),
                type: t.Enum(TransactionTypes),
                walletId: t.Integer()
            })
        });
    }
}