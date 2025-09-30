const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnection = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not set");
  }

  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Increase pool size and allow longer selection timeout for serverless cold starts
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      // Force IPv4 (sometimes helps in serverless / DNS resolution issues)
      family: 4,
      // Use new URL parser and topology (Mongoose 6+ uses these by default but explicit is fine)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log("Connecting to MongoDB with options:", {
      serverSelectionTimeoutMS: opts.serverSelectionTimeoutMS,
      connectTimeoutMS: opts.connectTimeoutMS,
      maxPoolSize: opts.maxPoolSize,
      family: opts.family,
    });

    cached.promise = mongoose
      .connect(process.env.MONGODB_URL, opts)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection error:", err);
    // Provide more actionable message for deployment logs
    console.error(
      "Ensure MONGODB_URL is set in Vercel, Atlas allows 0.0.0.0/0 or Vercel IPs, and credentials are correct."
    );
    throw err;
  }
};

module.exports = dbConnection;


