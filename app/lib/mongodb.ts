import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const dbConnect = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || '';
  
  console.log('🔍 MONGODB_URI:', MONGODB_URI ? 'URI is set' : 'URI is missing');
  console.log('📊 Current connection state:', mongoose.connection.readyState);
  
  // Check if we already have a good connection
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  // Check if connection is in progress
  if (mongoose.connection.readyState === 2) {
    console.log('⏳ Connection in progress, waiting...');
    return;
  }

  if (!MONGODB_URI) {
    throw new Error('❌ MONGODB_URI is not defined in environment variables');
  }

  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: 'carhub', // This will create/use the 'carhub' database
      // Add these options for better connection handling
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      retryWrites: true,
      w: 'majority'
    });
    
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB');
    console.log('🏢 Database:', connection.connection.db?.databaseName);
    console.log('🌐 Host:', connection.connection.host);
    
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    isConnected = false;
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

// Optional: Add connection event listeners for better debugging
mongoose.connection.on('connected', () => {
  console.log('🎉 Mongoose connected to MongoDB');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('💥 Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 Mongoose connection closed due to app termination');
  process.exit(0);
});