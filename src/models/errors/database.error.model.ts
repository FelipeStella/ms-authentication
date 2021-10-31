export class DatabaseError {

    constructor(
        public message: string,
        public error?: any
    ){
        this.message = message;
    }
};
