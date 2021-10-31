export class UnauthorizedError {
    constructor(
        public message: string,
        public error?: any
    ){
        this.message = message;
    }
};