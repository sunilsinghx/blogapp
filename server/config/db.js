import mongoose from "mongoose";


export function ConnectDB(){

  mongoose.set("strictQuery", false);
  
  
  
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      console.log(e);
    });
}
