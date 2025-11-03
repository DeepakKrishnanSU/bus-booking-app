require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully with hashed password");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });