import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is not configured');

const client = new MongoClient(uri);
const database = client.db('bazardar');

export const auth = betterAuth({
  database: mongodbAdapter(database, { client }),
  emailAndPassword: { enabled: true, autoSignIn: true },
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:*',
    'http://127.0.0.1:*',
    'https://bazar-dor-bd-one.vercel.app',
    'https://bazar-dor-729eu8uye-sabikun.vercel.app',
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter((origin): origin is string => Boolean(origin)),
});
