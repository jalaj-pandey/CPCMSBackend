import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();


// Routes.... /api/v1/user/new
app.post('/new',singleUpload, newUser);

// Route.... /api/v1/user/all
app.get('/all',adminOnly, getAllUsers);

// Route.... /api/v1/user/dynamicID
app.route("/:id")
    .get( getUser)
    .delete(adminOnly,deleteUser);


export default app;