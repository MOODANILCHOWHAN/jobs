import adminlogIns from "../model/adminLogIn";
import validate from "../services/logInValidate";

const adminLogInController= async (req,res)=>{
try {
    const { emailId, password } = req.body;
    const dbUser= await adminlogIns.findOne({ email: emailId });
    if (!dbUser) {
        return res.status(404).json({ message: "Invalid email ID" });
      }


    const validate= validate(password,dbUser.passwor);
    if(validate.status == 201){
        res.status(validate.status).json({message:validate.message})
    }
    else{
        res.status(validate.status).json({message:validate.message});
    }
} catch (error) {
    res.status(501).json('some thing went wrong.')
}
}

export default adminLogInController