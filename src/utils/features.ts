import mongoose from "mongoose"
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";


export const connectDB = (uri:string) =>{
    mongoose.connect(uri,{
        dbName: "Placements"
    }).then(c => console.log(`DB connected to ${c.connection.host}successfully`)).
    catch(e  => console.log('e'));

}

export const invalidateCache = async ({jobs, apply, admin, userId, applyId, jobId}:InvalidateCacheProps) => {
    if(jobs) {

        const jobKeys: string[] = ["latest-jobs", "admin-jobs"];
        
        if (typeof jobId === "string") jobKeys.push(`job-${jobId}`);

    myCache.del(jobKeys);
    }
    if(apply) {
        const appliesKeys: string[] = [
            `all-applies`,
            `applies-${userId}`,
            `applies-${applyId}`
          ];
          
          myCache.del(appliesKeys)
    }
    if(admin) {

    }
}