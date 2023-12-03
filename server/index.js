import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js"
import teamRoute from "./routes/teamRoute.js"
import cors from "cors"


const app = express();
dotenv.config(); 
 
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => { 
        console.log("DB connected successfully"); 
    })
    .catch((error) => console.log(`${error} did not connect`))

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
}) 

// middlewares
app.use(express.json())
app.use(cors())

app.use("/api", userRoute)
app.use("/api/team", teamRoute)

app.use((err,req,res) => {
    const errorStatus = err.status || 500
    const errorMsg = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus, 
        message:errorMsg,
        stack: err.stack 
    })
})

app.get("/", (req,res)=>{
    res.send("Success")
})

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`)
}) 
