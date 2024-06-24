import { config } from 'dotenv';

config({ path: '.env' });

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

export default { PORT, DB_URL };
