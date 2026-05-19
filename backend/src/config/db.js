const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using mongoose.
 * Configured to read MONGO_URI from environment variables.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[DATABASE] MongoDB Connection Established Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE] Connection Failure Error: ${error.message}`);
    process.exit(1); // Terminate node server process on connection failure
  }
};

module.exports = connectDB;
