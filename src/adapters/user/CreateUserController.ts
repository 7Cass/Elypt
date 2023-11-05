import Elysia, { t } from "elysia";
import CreateUser from "../../core/user/service/CreateUser";

export default class CreateUserController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: CreateUser) {
        server.post('/users', async ({ body, set }) => {
            const { email, password, name } = body;
            await useCase.execute({ name, email, password });
            set.status = 201;
        }, {
            body: t.Object({
                name: t.String(),
                email: t.String(),
                password: t.String({ minLength: 8 })
            }),
            detail: {
                tags: ['App']
            }
        });
    }
}