import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;
  
  console.log("MONGO_URI:", MONGO_URI); // debug

  if (!MONGO_URI) throw new Error("MONGO_URI is undefined in environment!");

  if (cached.conn) return cached.conn;

  cached.promise = cached.promise || mongoose.connect(MONGO_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}