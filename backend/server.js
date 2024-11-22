// npm install express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer stripe validator nodemon

// mongodb+srv://vinayakbhovi56:Vinayak1234@cluster0.qkabk.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/UserRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orederRoute.js"


//app config
const app = express()
// const port = 4000
const port = process.env.PORT || 4000


// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/food",foodRouter)
//http://localhost:4000/images/1724495680376Vinayak_Bhovi_logo.png
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res) => {
    res.send("API Working")
})


app.listen(port,() => {
    console.log(`Server Started on http://localhost:${port}`)
})