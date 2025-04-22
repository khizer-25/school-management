const Admin = require("../models/admin");
const { responseObjGenerator, hashPassword, comparePassword, generateToken } = require("../utils/utils");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json(responseObjGenerator(false, "Admin already exists"));

    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json(responseObjGenerator(true, "Admin registered successfully"));

  } catch (err) {
    res.status(500).json(responseObjGenerator(false, "Server error", err.message));
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json(responseObjGenerator(false, "Invalid email or password"));

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) return res.status(400).json(responseObjGenerator(false, "Invalid email or password"));

    const token = generateToken({ id: admin._id });

    res.status(200).json(responseObjGenerator(true, "Login successful", { token, admin: { id: admin._id, name: admin.name, email: admin.email } }));

  } catch (err) {
    res.status(500).json(responseObjGenerator(false, "Server error", err.message));
  }
};

module.exports = {
  registerAdmin,
  loginAdmin
};
