import Elysia, { t } from "elysia";
import FindUserById from "../../core/user/service/FindUserById";
import authMiddleware from "../middlewares/AuthMiddleware";

export default class FindUserByIdController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: FindUserById) {

        server.get('/users/:id', async ({ params }) => {
            const { id } = params;
            return await useCase.execute({ id: +id });
        }, {
            beforeHandle: [authMiddleware],
            params: t.Object({
                id: t.String()
            }),
            detail: {
                tags: ['App']
            }
        });
    }
}