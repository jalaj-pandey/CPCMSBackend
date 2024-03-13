import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { newApplication } from "../controllers/applications.js";
const app = express.Router();


// Routes.... /api/v1/apply/new

app.post('/new', newApplication);



export default app;