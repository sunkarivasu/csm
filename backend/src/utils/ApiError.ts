class ApiError extends Error {
    constructor(public msg: string, public status: number = 500) {
        super(msg);

        this.status = status;
    }
}

export default ApiError;