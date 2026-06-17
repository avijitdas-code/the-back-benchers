import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Please add MONGO_URI to .env.local");

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  console.log("MONGO_URI:", process.env.MONGO_URI); // 👈 added debug line
  
  if (cached.conn) return cached.conn;

  cached.promise = cached.promise || mongoose.connect(MONGO_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}