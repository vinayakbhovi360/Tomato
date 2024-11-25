import mongoose, { connect } from "mongoose";
// mongodb+srv://vinayakbhovi56:Vinayak1234@cluster0.qkabk.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0

// vinayakbhovi360 iyP08eiZRoiFyhQu  

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connect"))
}