import Elysia, { t } from "elysia";
import AuthenticateUser from "../../core/user/service/AuthenticateUser";

export default class AuthenticateUserController {
    constructor(readonly server: Elysia<'/api'>, readonly useCase: AuthenticateUser) {
        server.post('/users/login', async ({ body, set }) => {
            const { email, password } = body;
            const access_token = await useCase.execute({ email, password });
            set.status = 200;
            return access_token;
        }, {
            body: t.Object({
                email: t.String(),
                password: t.String({ minLength: 8 })
            }),
            detail: {
                description: "Authenticate the user and return the access token.",
                summary: "Authenticate the user.",
                operationId: "AuthenticateUser",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            example: {
                                email: "joao@mail.com",
                                password: "supersecure123"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Access token.",
                        content: {
                            "application/json": {
                                example: {
                                    access_token: "YOUR_ACCESS_TOKEN"
                                }
                            }
                        }
                    }
                },
                tags: ['Auth'],
            }
        })
    }
}