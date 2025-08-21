import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const dbConnect = async () => {
  // mongoose.set('bufferCommands', true);
const MONGODB_URI = process.env.MONGODB_URI||'';
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(`mongodb+srv://aitoolguide:dewpAPkO92sx2dcR@cluster0.k65aqze.mongodb.net/`,{dbName: 'carhub'});
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}