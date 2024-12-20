const bcrypt = require("bcryptjs");
const User = require("../models/User");

const firstAdminData = {
  name: "Super Admin",
  email: process.env.FIRST_ADMIN_EMAIL,
  role: "admin",
};

const createFirstAdmin = async () => {
  const user = await User.findOne({
    email: process.env.FIRST_ADMIN_EMAIL,
    role: "admin",
  });

  if (!user) {
    const hashPassword = bcrypt.hashSync(process.env.FIRST_ADMIN_PASSWORD, 10);
    await User.create({ ...firstAdminData, password: hashPassword });
    console.log("First admin has been created");
  }
};

module.exports = createFirstAdmin;
