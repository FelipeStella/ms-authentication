export class ForbiddenError  {
    constructor(
        public message: string,
        public error?: any
    ){
        this.message = message;
    }
};

