import mongoose, {connect} from "mongoose";

export default async function connectMongoDb(params) {
    try {
        await mongoose.connect(process.env.ENV_URI)
        console.log('The MongoDB database is connected')
    } catch (error) {
        console.log("The MongoDB database is not connected: ", error)
    }
    
}