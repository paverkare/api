
export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export function sendError(res: Response, err: Error): void {
    const message = err.message || 'Internal Error',
        status: number = (err as any).status || 500;

    if (process.env.NODE_ENV !== 'test') {
        console.error(err);
    }

    (res as any).status(status).json({
        error: message ,
    });
}