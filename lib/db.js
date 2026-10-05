import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
let connection = globalThis.__portfolioMongo;
if (!connection) {
  connection = globalThis.__portfolioMongo = { promise: null };
}

export async function connectDb() {
  if (!uri) throw new Error('MONGODB_URI is not configured. Copy .env.example to .env.local and add your database URL.');
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
