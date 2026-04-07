import mongoose from 'mongoose';

async function connectMongoDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
}

export default connectMongoDB;
