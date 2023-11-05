import Elysia, { t } from "elysia";
import GetWalletByUserId from "../../core/wallet/service/GetWalletByUserId";
import authMiddleware from "../middlewares/AuthMiddleware";

export default class GetWalletController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: GetWalletByUserId) {
        server.get('/wallets/:userId', async ({ params }) => {
            const { userId } = params;
            return await useCase.execute({ userId: +userId });
        }, {
            beforeHandle: [authMiddleware],
            params: t.Object({
                userId: t.String()
            }),
            detail: {
                tags: ['App']
            }
        });
    }
}