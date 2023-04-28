import { config } from 'dotenv';

config();

const { env } = process;
export const MONGO_URI = env.MONGO_URL || 'mongodb://127.0.0.1:27017/uzstore';
