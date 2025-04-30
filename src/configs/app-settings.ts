import 'dotenv/config';

export const appSettings = {
    port: Number(process.env.PORT) || 3000,
    socketPort: Number(process.env.WEBSOCKET_PORT),
    development: process.env.DEVELOPMENT,
    mainLanguage: process.env.MAIN_LANGUAGE || 'en',
    maxFileSize: {
        admin: Number(process.env.MAX_FILE_SIZE_UPLOAD_ADMIN),
        front: Number(process.env.MAX_FILE_SIZE_UPLOAD_USER),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRES_IN,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpireIn: process.env.JWT_REFRESH_EXPIRES_IN,
        issuer: process.env.JWT_ISSUER,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    vnpay: {
        tmnCode: process.env.VNP_TMNCODE,
        hashSecret: process.env.VNP_HASH_SECRET,
        url: process.env.VNP_URL,
        returnUrl: process.env.VNP_RETURN_URL,
    },
    donateUrl: {
        donateSuccessUrl: process.env.DONATE_SUCCESS_URL,
        donateFailUrl: process.env.DONATE_FAIL_URL,
    },

    openIdConnect: {
        sessionSecret: process.env.SESSION_SECRET,
    },
    mongoose: {
        uri: process.env.MONGO_URI,
        uri_production: process.env.MONGO_URI_PRODUCTION,
    },
    s3: {
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_ACCESS_KEY,
        cloundFront: process.env.AWS_CLOUD_FRONT,
        bucket: process.env.AWS_BUCKET_NAME,
        folder: process.env.AWS_FOLDER_NAME_DEFAULT || 'marketplace',
        region: process.env.AWS_REGION,
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL,
    },
    redis: {
        heathCheck: process.env.REDIS_HOST ? true : false,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
    mail: {
        email: process.env.EMAIL,
        appPass: process.env.APP_PASSWORD,
    },
    transport: {
        ghnApi: process.env.GHN_TRANSPORT_API,
        ghnToken: process.env.GHN_TRANSPORT_TOKEN,
        ghnShopId: process.env.GHN_TRANSPORT_SHOP_ID,
    },
};
