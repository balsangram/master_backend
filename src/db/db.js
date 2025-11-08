import mongoose from "mongoose"
import { DB_NAME, PASSWORD, USERNAME } from "../envConfig.js";

// ✅ Encode username/password to safely handle special characters like '@'
// const encodedUsername = encodeURIComponent(USERNAME);
// const encodedPassword = encodeURIComponent(PASSWORD);

// const MONGODB_URI = `mongodb+srv://${encodedUsername}:${encodedPassword}@cluster0.qfkll1w.mongodb.net/${DB_NAME}?appName=Cluster0`
const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.f6kvte0.mongodb.net/${DB_NAME}?appName=Cluster0`


async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(MONGODB_URI)
        console.log(connectionInstance, "connectionInstance")
    } catch (error) {
        console.log(error, "error");
        process.exit(1);
    }
}
export {
    connectDB,
}