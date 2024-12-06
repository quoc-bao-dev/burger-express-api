import { config } from '../config/config';
import { generateToken, isTokenValid, verifyToken } from './jwt.utils';

// Function to create an access token with a short expiration time
export const createAccessToken = (payload: any) => {
    return generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        config.ACCESS_TOKEN_EXPIRES
    );
};

// Function to create a refresh token with a longer expiration time
export const createRefreshToken = (payload: any) => {
    return generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        config.REFRESH_TOKEN_EXPIRES
    );
};

// Function to verify the validity of an access token
export const verifyAccessToken = (token: string) => {
    return verifyToken(token, config.ACCESS_TOKEN_SECRET);
};

// Function to verify the validity of a refresh token
export const verifyRefreshToken = (token: string) => {
    return verifyToken(token, config.REFRESH_TOKEN_SECRET);
};

// Function to check if an access token is valid
export const isAccessTokenValid = (token: string) => {
    return isTokenValid(token, config.ACCESS_TOKEN_SECRET);
};

// Function to check if a refresh token is valid
export const isRefreshTokenValid = (token: string) => {
    return isTokenValid(token, config.REFRESH_TOKEN_SECRET);
};
