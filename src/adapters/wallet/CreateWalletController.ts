import Elysia, { t } from "elysia";
import CreateWallet from "../../core/wallet/service/CreateWallet";
import authMiddleware from "../middlewares/AuthMiddleware";

export default class CreateWalletController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: CreateWallet) {
        server.post('/wallets', async ({ body }) => {
            const { balance, userId } = body as any;
            return await useCase.execute({ balance, userId });
        }, {
            beforeHandle: [authMiddleware],
            body: t.Object({
                balance: t.Numeric(),
                userId: t.Integer()
            }),
            detail: {
                tags: ['App']
            }
        });
    }
}