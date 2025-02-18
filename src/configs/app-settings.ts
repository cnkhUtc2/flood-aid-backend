import 'dotenv/config';

// export const appSettings = {
//     port: Number(process.env.PORT) || 3000,
//     development: process.env.DEVELOPMENT,
//     mainLanguage: process.env.MAIN_LANGUAGE || 'en',
//     maxFileSize: {
//         admin: Number(process.env.MAX_FILE_SIZE_UPLOAD_ADMIN),
//         front: Number(process.env.MAX_FILE_SIZE_UPLOAD_USER),
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET,
//         expireIn: process.env.JWT_EXPIRES_IN,
//         refreshSecret: process.env.JWT_REFRESH_SECRET,
//         refreshExpireIn: process.env.JWT_REFRESH_EXPIRES_IN,
//         issuer: process.env.JWT_ISSUER,
//     },
//     openIdConnect: {
//         sessionSecret: process.env.SESSION_SECRET,
//     },
//     mongoose: {
//         uri: process.env.MONGO_URI,
//     },
//     s3: {
//         accessKey: process.env.AWS_ACCESS_KEY_ID,
//         secretKey: process.env.AWS_SECRET_ACCESS_KEY,
//         bucket: process.env.AWS_BUCKET_NAME,
//         folder: process.env.AWS_FOLDER_NAME_DEFAULT || 'marketplace',
//         region: process.env.AWS_REGION,
//     },
//     redis: {
//         heathCheck: process.env.REDIS_HOST ? true : false,
//         host: process.env.REDIS_HOST,
//         port: Number(process.env.REDIS_PORT),
//         username: process.env.REDIS_USERNAME,
//         password: process.env.REDIS_PASSWORD,
//     },
// };

export const appSettings = {
    port: Number(process.env.PORT) || 3000,
    development: true,
    mainLanguage: process.env.MAIN_LANGUAGE || 'en',
    maxFileSize: {
        admin: Number(25),
        front: Number(5),
    },
    jwt: {
        secret: '84aa7e172d2a41b48f505e643ae688d5f809ddc6d001784a896681df0a4ffea7',
        expireIn: '10d',
        refreshSecret:
            'ulhaPpEFzWBUdcEjeSxpuvy9UnPxypAgbYLPlGdS8OuKsdNsVbQBkcb3ApA6zZ6',
        refreshExpireIn: '30d',
        issuer: 'playgroundx',
    },
    openIdConnect: {
        sessionSecret: 'super+secret+session+key',
    },
    mongoose: {
        uri: 'mongodb://localhost:27017/tongram-be',
    },
    s3: {
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: process.env.AWS_BUCKET_NAME,
        folder: process.env.AWS_FOLDER_NAME_DEFAULT || 'marketplace',
        region: process.env.AWS_REGION,
    },
    redis: {
        heathCheck: process.env.REDIS_HOST ? true : false,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
};
