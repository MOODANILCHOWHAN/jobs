import adminlogIn from "../model/adminLogIn.js";
import validatePassword from "../services/logInValidate.js";
import jwt from 'jsonwebtoken';

const adminLogInController= async (req,res)=>{
try {
    const { emailId, password } = req.body;
    const dbUser= await adminlogIn.findOne({ email: emailId });
    if (!dbUser) {
        return res.status(404).json({ message: "Invalid email ID" });
      }


    const validate= validatePassword(password,dbUser.passwor);
    if(validate.status == 201){
        const jwts=jwt.sign({userId:dbUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(validate.status).json({token:jwts,message:validate.message})
    }
    else{
        res.status(validate.status).json({message:validate.message});
    }
} catch (error) {
    res.status(501).json('some thing went wrong.')
}
}

export default adminLogInController