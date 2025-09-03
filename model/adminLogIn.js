import mongoose, { Schema } from "mongoose";

const AdminLoginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Model name: AdminLogin -> Collection name: adminlogins
const AdminLogin = mongoose.model("AdminLogin", AdminLoginSchema);
export default AdminLogin;
