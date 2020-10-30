import { config } from 'dotenv';

// Locading environment variables
config();
const Port = Number(process.env.PORT) || 8081;

export { Port };
