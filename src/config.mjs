import * as dotenv from 'dotenv';

// Locading environment variables
dotenv.config();
const Port =  Number(process.env.PORT) || 8081;

export { Port };