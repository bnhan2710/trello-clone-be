import { WHITELIST_DOMAIN } from "../common/enums/domain";
import { env } from "./env.config";
import { StatusCodes } from "http-status-codes";
import { ForbiddenError } from "../handler/error.response";

export const corsOptions = { 
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin && env.BUILD_MODE === 'development') {
           return callback(null, true);
        } 
        if (origin && Object.values(WHITELIST_DOMAIN).includes(origin as WHITELIST_DOMAIN)) {
           return callback(null, true);
        }
        return callback(new ForbiddenError('Not allowed by CORS'));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: StatusCodes.OK,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};