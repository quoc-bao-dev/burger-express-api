import ApiError from '../core/ApiError';
import { CreateUserInput } from '../models/interfaces/user.interface';
import User from '../models/user.schema';
import {
    createAccessToken,
    createRefreshToken,
} from '../utils/auth-token.utils';
import { comparePassword, hashPassword as hash } from '../utils/bcrypt.utils';

const AuthService = {
    register: async (payload: CreateUserInput) => {
        //check email exist
        const findUserByEmail = await User.findOne({ email: payload.email });
        if (findUserByEmail) {
            throw ApiError.conflict('Email already exist');
        }

        //create User
        const hashPassword = await hash(payload.password);
        const userInput = { ...payload, hashPassword };
        const user = await User.create(userInput);

        //create token
        const payloadToken = {
            userId: user.id,
        };
        const accessToken = createAccessToken(payloadToken);
        const refreshToken = createRefreshToken(payloadToken);
        return { accessToken, refreshToken };
    },

    login: async (email: string, password: string) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.notFound('User not found');
        }
        const isPasswordMatch = await comparePassword(
            password,
            user.hashPassword
        );
        if (!isPasswordMatch) {
            throw ApiError.unauthorized('Password incorrect');
        }
        const payloadToken = {
            userId: user.id,
        };
        const accessToken = createAccessToken(payloadToken);
        const refreshToken = createRefreshToken(payloadToken);
        return { accessToken, refreshToken };
    },
};

export default AuthService;
