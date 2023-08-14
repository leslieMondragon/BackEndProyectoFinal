class CustomError extends Error {
    constructor({ name = 'Error', cause, message, code = 1 }) {
        super(message);
        this.cause = cause;
        this.name = name;
        this.code = code;
    }
}

export default CustomError;
