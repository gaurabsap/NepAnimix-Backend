import mongoose from "mongoose";
const Connectdb = async () => {
  try {
    const resq = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected with database");
  } catch (error) {
    console.log("Failed to connect");
  }
};

export default Connectdb;
