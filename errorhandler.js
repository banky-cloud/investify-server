const errorhandler=(err, req,res, next)=>{
    const message= err.message||"An error occured while processing your request"
    try {
        console.log(err.message)
       return res.status(500).json({success:false,result:message})
    } catch (error) {
       console.log(error.message) 
    }
}
export default errorhandler