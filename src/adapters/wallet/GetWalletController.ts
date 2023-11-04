import Elysia, { t } from "elysia";
import GetWalletByUserId from "../../core/wallet/service/GetWalletByUserId";

export default class GetWalletController {
    constructor(readonly server: Elysia, readonly useCase: GetWalletByUserId) {
        server.get('/wallets/:userId', async ({ params }) => {
            const { userId } = params;
            return await useCase.execute({ userId });
        }, {
            params: t.Object({
                userId: t.Integer()
            })
        });
    }
}