require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const Admin = require("./models/admin.model");

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });

      console.log("Default Admin Created");
    } else {
      console.log("Admin Already Exists");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const startServer = async () => {
  await connectDB();
  await createDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
