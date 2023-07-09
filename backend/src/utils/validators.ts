const isEmpty = (value: null | undefined | string | object): boolean => value === undefined || value === null || typeof value === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;

const trimReqBody = <T>(reqBody: T): T => {
    if (typeof reqBody === 'object' && !Array.isArray(reqBody)) {
        for (const key in reqBody) {
            if (typeof reqBody[key] === 'string') {
                const temp = reqBody[key] as string;
                reqBody = { ...reqBody, [key]: temp.trim() };
            }
        }
    }

    return reqBody;
}

export {
    isEmpty,
    trimReqBody
};
