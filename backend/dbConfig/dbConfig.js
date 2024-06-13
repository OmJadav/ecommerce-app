import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log(`MongoDb Connected : ✅`);
    } catch (error) {
        console.log(`MongoDb Connected : ✅`);
    }
}
export default connectDb;