import express from "express";
const port = process.env.PORT || 3000;

const app = express();
import userRoutes from "./routes/user.js"


app.use("api/v1/user", userRoutes);




app.listen(port, ()=>{
    console.log(`listening on http://localhost/${port}`)
})