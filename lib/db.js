import mongoose from 'mongoose';

let connection = globalThis.__portfolioMongo;
if (!connection) {
  connection = globalThis.__portfolioMongo = { promise: null };
}

export async function connectDb() {
  const rawUri = process.env.MONGODB_URI;
  const uri = rawUri?.trim()?.replace(/^(['"])(.*)\1$/, '$2');
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Please add MONGODB_URI in your Vercel Project Settings > Environment Variables.');
  }
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!connection.promise) {
    connection.promise = mongoose.connect(uri, { bufferCommands: false }).catch((error) => {
      connection.promise = null;
      throw error;
    });
  }
  await connection.promise;
  return mongoose;
}
