import { verify } from "jsonwebtoken";
import CustomError from "../errors/CustomError";
import { Context } from "elysia";

type TokenPayload = {
    sub: string;
}

export default function authMiddleware(ctx: any) {
    const authToken = ctx.headers.authorization;

    if (!authToken) {
        throw new CustomError(401, "Missing token.")
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    } catch (error) {
        throw new CustomError(401, "Invalid token.")
    }
}