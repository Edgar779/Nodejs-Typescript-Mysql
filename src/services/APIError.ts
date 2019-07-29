class ExtendableError extends Error {

    public status: number;
    public info: string;
    public isOperational: boolean;

    constructor(message: string, status: number, info: string) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.info = info;
        this.isOperational = true;
        Error.captureStackTrace(this);
    }
}

class APIError extends ExtendableError {
    constructor(message: any, status = 500, info: string = null) {
        super(message, status, info);
        if (this.status !== 400 && this.status !== 401 && this.status !== 404) {
            console.error(this);
        }
    }
}

export default APIError;