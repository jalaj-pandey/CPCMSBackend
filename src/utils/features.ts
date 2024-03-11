import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/types.js";
import { Jobs } from "../models/jobs.js";
import { myCache } from "../app.js";

export const connectDB = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017",{
        dbName: "Placements"
    }).then(c => console.log(`DB connected to ${c.connection.host}successfully`)).
    catch(e  => console.log('e'));

}

export const invalidateCache = async ({jobs, apply, admin}:InvalidateCacheProps) => {
    if(jobs) {

        const jobKeys: string[] = ["latest-jobs", "admin-jobs"];
        const jobss = await Jobs.find({jobs}).select("_id");
        jobss.forEach(i => {
           jobKeys.push(`jobs-${i._id}`);
        });
        myCache.del(jobKeys);
    }
    if(apply) {

    }
    if(admin) {

    }
}