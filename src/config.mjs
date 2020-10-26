import dotenv from 'dotenv';

dotenv.config();
const Port = Number(process.env.PORT) || 8081;

export { Port };
