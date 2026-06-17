import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/lib/mongodb.js";
import Admin from "./src/models/Admin.js";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("123", 10);

    await Admin.create({
      email: "muhammedmidlaj561@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();