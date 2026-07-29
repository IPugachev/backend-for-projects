import type {
    NextFunction,
    Request,
    Response,
} from "express";
import type { ZodObject } from "zod";

interface ValidateSchema {
    body?: ZodObject;
    query?: ZodObject;
    params?: ZodObject;
}

export function validate(schema: ValidateSchema) {
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        if (schema.body) {
            req.body = schema.body.parse(req.body);
        }
        if (schema.params) {
            schema.params.parse(req.params);
        }

        if (schema.query) {
            schema.query.parse(req.query);
        }

        next();
    };
}
