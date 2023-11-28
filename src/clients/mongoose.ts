import mongoose from "mongoose";

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const uri = process.env.MONGODB_URI;

  try {
    mongoose.connection.on("error", function (err) {
      console.log(err);
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.log("Could not connect", error);
  }
};

await dbConnect().catch((err) => console.log(err));

export default dbConnect;
