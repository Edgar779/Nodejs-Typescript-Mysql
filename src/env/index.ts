const env: string = process.env.NODE_ENV || 'development';
const mainConfig: IMainConfig = require(`./${env}`).default;

export interface IMainConfig {
    NODE_ENV: string;
    BASE_URL: string;
    BASE_IMG_URL: string;
    PORT: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    Bcrypt_Admin: any;
    MEDIA_PATH: string;
}

export default mainConfig;