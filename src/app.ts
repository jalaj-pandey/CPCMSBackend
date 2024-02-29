import express from "express";
const port = process.env.PORT || 3000;

const app = express();
import userRoutes from "./routes/user.js"
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

app.use(express.json());
connectDB();

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.send("This is working");
})


app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log(`listening on http://localhost/${port}`)
})