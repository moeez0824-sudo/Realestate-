import mongoose from "mongoose";
import User from "../models/userModal.js";
import Home from "../models/homeModal.js";
import { homes as defaultHomes } from "../data/homesData.js";

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    let adminUser;
    if (userCount === 0) {
      adminUser = await User.create({
        name: "PakEstate Admin",
        email: "admin@pakestate.pk",
        password: "password123",
        isAdmin: true,
        profileImg: "/uploads/user/user.png",
      });

      await User.create({
        name: "Moeez Real Estate",
        email: "user@pakestate.pk",
        password: "password123",
        isAdmin: false,
        profileImg: "/uploads/user/user.png",
      });
      console.log("Default users seeded: admin@pakestate.pk / password123".green);
    } else {
      adminUser = await User.findOne({ isAdmin: true });
    }

    const homeCount = await Home.countDocuments();
    if (homeCount === 0 && adminUser) {
      const homesToInsert = defaultHomes.map((item) => {
        const { _id, ...rest } = item;
        return {
          ...rest,
          posted_by: adminUser._id,
          date: new Date(),
        };
      });
      await Home.insertMany(homesToInsert);
      console.log(`Seeded ${homesToInsert.length} properties into database.`.green);
    }
  } catch (err) {
    console.error("Database seeding info:".yellow, err.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    await seedData();
  } catch (error) {
    console.log(`External MongoDB not detected (${error.message}). Starting embedded MongoMemoryServer...`.yellow);
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log(`Embedded MongoDB Connected: ${conn.connection.host}`.green.underline);
      await seedData();
    } catch (memErr) {
      console.error(`MongoDB Warning: ${memErr.message}`.yellow.bold);
      console.log("Server will continue running in offline mode.".yellow);
    }
  }
};

export default connectDB;

