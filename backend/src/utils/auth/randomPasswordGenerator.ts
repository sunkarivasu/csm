import ApiError from "../ApiError";

const generateRandomPassword = (length: number = 8, rules: (0 | 1)[] = [1, 1, 1, 1]): string => {
    try {
        validateParams(length, rules);
        const allChars = prepareTokens(rules);
        const password: (string | number | symbol | undefined)[] = Array(length);

        allChars.forEach(chars => {
            setRandomChar(password, chars[Math.floor(Math.random() * chars.length)]);
            setRandomChar(password, chars[Math.floor(Math.random() * chars.length)]);
        });

        for (let i = 8; i < length; i++) {
            setRandomChar(password, allChars[Math.floor(Math.random() * allChars.length)][Math.floor(Math.random() * allChars.length)]);
        };

        return password.join('');
    } catch (err) {
        throw err;
    }
}

const setRandomChar = (password: (string | number | symbol | undefined)[], char: string): void => {
    let index = Math.floor(Math.random() * password.length);
    while (password[index]) {
        index = index + 1;
        index = index % password.length;
    }

    password[index] = char;
};

const validateParams = (length: number, rules: (0 | 1)[]): void => {
    if (length < 8) throw new ApiError('Password length must be at least 8 characters long', 422);

    if (rules.length !== 4) throw new ApiError('Password rules must be an array of length 4', 422);

    if (rules.every(rule => rule === 0)) throw new ApiError('At least one rule must be enabled', 422);
}

const prepareTokens = (rules: (0 | 1)[]): string[] => {
    const chars: { [key: string]: string } = {
        lowerCaseLetters: "abcdefghijklmnopqrstuvwxyz",
        upperCaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        specialCharacters: "!@#$%^&*()_-"
    };
    const allChars: string[] = [];
    rules.forEach((rule, index) => {
        if (rule) allChars.push(chars[Object.keys(chars)[index]]);
    });

    return allChars;
}

export default generateRandomPassword;