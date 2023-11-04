import Elysia, { t } from "elysia";
import FindUserById from "../../core/user/service/FindUserById";

export default class FindUserByIdController {
    constructor(readonly server: Elysia, readonly useCase: FindUserById) {
        server.get('/users/:id', async ({ params }) => {
            const { id } = params;
            await useCase.execute({ id });
        }, {
            params: t.Object({
                id: t.Integer()
            })
        });
    }
}