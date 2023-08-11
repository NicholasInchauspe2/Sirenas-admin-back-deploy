import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 5;

const hashPassword = async (password: string, salt: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch (error) {
        console.error(error);
        throw new Error("Error hashing password");
    }
}

const validatePassword = async (password : string, user: {salt: string, password: string}) => {
    try {
        const hash = await bcrypt.hash(password, user.salt)
        return hash === user.password
    } catch (error) {
        console.error(error);
        throw new Error("Error validating password");
    }
}

export { hashPassword, validatePassword}