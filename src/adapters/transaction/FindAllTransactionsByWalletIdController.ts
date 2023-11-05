import Elysia, { t } from "elysia";
import FindAllTransactionsByWalletId from "../../core/transaction/service/FindAllTransactionsByWalletId";
import authMiddleware from "../middlewares/AuthMiddleware";

export default class FindAllTransactionsByWalletIdController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: FindAllTransactionsByWalletId) {
        server.get('/transactions/:walletId', async ({ params }) => {
            const { walletId } = params;
            return await useCase.execute({ walletId: +walletId });
        }, {
            beforeHandle: [authMiddleware],
            params: t.Object({
                walletId: t.String()
            })
        });
    }
}