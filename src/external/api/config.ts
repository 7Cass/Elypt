import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from '@elysiajs/cors';
import CustomError from "../../adapters/errors/CustomError";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";

const app = new Elysia({ prefix: '/api' });

app
    .get('/', (handler) => {
        return "Welcome to Elypt API"
    })
    .use(swagger({
        path: 'docs',
        exclude: ['/docs', '/docs/json'],
        autoDarkMode: true,
        documentation: {
            info: {
                title: 'Elypt Documentation',
                version: '1.0.0'
            },
            tags: [
                { name: 'App', description: 'General endpoints' },
                { name: 'Auth', description: 'Authentication endpoints' }
            ]
        }
    }))
    .use(cors())
    .use(
        jwt({
            name: 'jwt',
            secret: Bun.env.JWT_SECRET as string
        })
    )
    .use(cookie())

app
    .error({ myError: CustomError })
    .onError(({ code, error, set }) => {
        set.status = Number(code) ? code as typeof set.status : 500;

        return {
            code,
            error: error.message
        };
    });

export default app;