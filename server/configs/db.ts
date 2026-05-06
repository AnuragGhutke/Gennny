import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/gennny` as string)
        console.log('MongoDB connected 🚀')
    } catch (err) {
        console.error('failed to connect to DB ❌', err)
        process.exit(1); // stop server if DB fails
    }
}