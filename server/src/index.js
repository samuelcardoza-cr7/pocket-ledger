import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT) || 4000;
if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) throw new Error('Set CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY in server/.env.');
await connectDatabase();
app.listen(port, () => console.log(`Pocket Ledger API listening on port ${port}`));
