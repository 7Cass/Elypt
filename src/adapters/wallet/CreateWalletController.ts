import Elysia, { t } from "elysia";
import CreateWallet from "../../core/wallet/service/CreateWallet";

export default class CreateWalletController {
    constructor(readonly server: Elysia, readonly useCase: CreateWallet) {
        server.post('/wallets', async ({ body }) => {
            const { balance, userId } = body as any;
            return await useCase.execute({ balance, userId });
        }, {
            body: t.Object({
                balance: t.Numeric(),
                userId: t.Integer()
            })
        });
    }
}