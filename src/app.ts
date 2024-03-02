import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

import userRoute from "./routes/user.js"
import jobRoute from "./routes/jobs.js"


const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
connectDB();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);

app.get("/", (req, res) => {
    res.send("This is working");
})

app.use('/uploads', express.static("uploads"))


app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log(`listening on http://localhost/${port}`)
})