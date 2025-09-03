import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token= authHeader?.split('')[1];

    if(!token)return res.status(403).json({message:'required token'})

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({message:'Invalid token'})
    }
}