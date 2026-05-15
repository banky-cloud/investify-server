import jwt from "jsonwebtoken"


export const verifyToken=(req, res, next)=>{
try {
     jwt.verify(req.headers.token, process.env.jwt_pass, (err,data)=>{
    if(err){
        console.log(err)
        return res.status(500).json({success:false, result:err.message})
        
    }
    else{
        req.user=data;
        next()
    }
     })
    
} catch (error) {
 console.log(error.message)
 return res.status(500).json({success:false,result:error.message})   
}
}


export const verifyAdmin= (req, res,next)=>{
    try {
        jwt.verify(req.headers.token,process.env.jwt_pass, (err,data)=>{
            if(err){
      return res.status(500).json({success:false, result:err.message})

            }
            else{
                if(!data.isAdmin){
                    return res.status(403).json({success:false, result:"Admin priviledges are required"});
                }
                else{
                    req.user=data;
                    next()
                }
            }
        })
    } catch (error) {
      console.log(error.message)  
      return res.status(500).json({success:false, result:error.message})
    }
}