import Elysia from "elysia";
import GetWalletByUserId from "../../core/wallet/service/GetWalletByUserId";

export default class GetWalletController {
    constructor(readonly server: Elysia, readonly useCase: GetWalletByUserId) {
        server.get('/wallets/:userId', async ({ params }) => {
            const { userId } = params as any;
            return await useCase.execute({ userId: +userId });
        });
    }
}