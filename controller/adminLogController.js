import AdminLogin from "../model/adminLogIn.js";
import validatePassword from "../services/logInValidate.js";
import jwt from "jsonwebtoken";

const adminLogInController = async (req, res) => {
  try {
    const { email, password } = req.body; // frontend must send { email, password }
    const dbUser = await AdminLogin.findOne({ email });

    if (!dbUser) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const validate = validatePassword(password, dbUser.password);

    if (validate.status === 201) {
      const token = jwt.sign(
        { userId: dbUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token, message: validate.message });
    }

    res.status(validate.status).json({ message: validate.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default adminLogInController;
