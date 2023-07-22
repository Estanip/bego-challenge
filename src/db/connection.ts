import moongose from "mongoose";
import { load } from "ts-dotenv";

const { MONGO_URI } = load({ MONGO_URI: String });

const connection = async () => {
  try {
    await moongose.connect(MONGO_URI);
    console.log("DB Succesfully Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
