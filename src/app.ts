import express from "express";
const port = process.env.PORT || 3000;

const app = express();
import userRoutes from "./routes/user.js"
import { connectDB } from "./utils/features.js";

connectDB();

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.send("This is working");
})


app.listen(port, ()=>{
    console.log(`listening on http://localhost/${port}`)
})