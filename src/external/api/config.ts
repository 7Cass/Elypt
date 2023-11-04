import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from '@elysiajs/cors';
import CustomError from "../../adapters/errors/CustomError";

const app = new Elysia();


app
    .use(cors())
    .use(swagger({
        path: '/docs',
        exclude: ['/docs', '/docs/json'],
        autoDarkMode: true,
        documentation: {
            info: {
                title: 'Elypt Documentation',
                version: '1.0.0'
            }
        }
    }));


app
    .error({ myError: CustomError })
    .onError(({ code, error, set }) => {
        set.status = +code;

        return {
            code,
            error: error.message
        };
    });

export default app;