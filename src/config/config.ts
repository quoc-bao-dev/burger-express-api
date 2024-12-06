import dotenv from 'dotenv';

dotenv.config({ path: '.env.production' });

export const config = {
    PORT: process.env.PORT || 3006,
    MONGODB_URI: process.env.MONGODB_URI as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES as string,
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES as string,
};
