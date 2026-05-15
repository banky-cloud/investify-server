import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken"
import generateCode from "./generateCode.js";
import transactionModel from "../../models/transactionModel.js";
import welcomeEmailTemplate from "../../templates/welcomeTemplate.js";
// import sendEmail from "../../services/sendEmail.js";
import forgotPasswordTemplate from "../../templates/resetPasswordTemplate.js";
import notificationTemplate from "../../templates/notificationTemplate.js";
import plansModel from "../../models/plansModel.js";
import  sendMail  from "../../services/sendMail.js";
import walletsModel from "../../models/walletsModel.js";





export const register= async(req,res,next)=>{
    const referral_code=generateCode(10)
    try{
        const {ref}=req.body
        let referrer_id
        const referrer= await userModel.findOne({referral_code:ref})
        if(referrer){

             referrer_id= referrer._id
        }

            const userObject={...req.body,referral_code}
            if(Boolean(referrer_id)){
                userObject.referrer=referrer;
            }
           const  newUser= await userModel.create(userObject)
           const html=welcomeEmailTemplate(newUser._id, newUser.firstName)
           sendMail({
            to:newUser.email,
            subject:"Welcome to Investify -- verify your email",
            html

           })
           if(referrer){

               const updatedReferrer= await userModel.findByIdAndUpdate(referrer_id,{$push:{referees:newUser._id}})
           }
            const {_id, isAdmin}= newUser._doc
            const token= jwt.sign({id:_id, isAdmin}, process.env.jwt_pass)
            return res.status(200).json({success:true, result:token})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }
}
export const getSiteStats= async(req,res,next)=>{
    try{
        const allUsers= await userModel.find().populate("transactions");
        const allTransactions= await  transactionModel.find().populate("user");
        return res.status(200).json({success:true, result:{allTransactions, allUsers} })
    }catch(err){
        console.log(err.message)
        next(err)
    }
}
export const login=async(req,res,next)=>{
    try {
        const {email, password}= req.body
        const thisUser= await userModel.findOne({email});
        console.log(thisUser)
        if(thisUser){
            const passwordIsCorrect=password===thisUser.password;
            if(passwordIsCorrect){
                const token = jwt.sign({id:thisUser._id, isAdmin:thisUser.isAdmin}, process.env.jwt_pass);
                return res.status(200).json({success:true, result:token})
            }
            else{
                return res.status(403).json({success:false, result:"Incorrect Password"})
            }
        }
        else{
            return res.status(404).json({success:false, result:"user was not found"})
        }
        
    } catch (error) {
        next(error)
    }
}
export const loginWithToken=async(req,res,next)=>{
try {
    const  {id}= req.user
    const thisUser=   await userModel.findById(id).populate("transactions")
    
    if(!thisUser){
        return res.status(404).json({success:false, result:"User was not found"})
    }
    else{
        res.status(200).json({success:true, result:thisUser})
    }
} catch (error) {
    next(error)
}

}

export const  editUser=async(req, res,next)=>{
    try {
        const {id}= req.params
        const updatedUser= await userModel.findByIdAndUpdate(id,{$set:{...req.body}})
        return res.status(200).json({success:true, result:"Updated successfully"})
        
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export const verifyEmail= async(req,res,next)=>{
    try{
        const {id}= req.params
        const verifiedUser= await userModel.findByIdAndUpdate(id, {$set:{isVerified:true}})
    // res.status(200).send("Congrats 🤝 You've been verified successfully")
    res.redirect("http://localhost:5173")
    }
    catch(err){
        next(err)
    }
}

export  const forgotPassword=async(req,res,next)=>{
    const {email} = req.body
    try {
        const thisUser= await userModel.findOne({email});
        if(!thisUser){
            return res.status(404).json({success:false, result:"User not found"})
        }
        else{
           const  html= forgotPasswordTemplate(thisUser.firstName, thisUser._id,process.env.domain)
            await sendMail({to:thisUser.email, subject:"Password Reset Instructions",html})

            return res.status(200).json({success:true, result:"Instructions were sent to your email"})
        }
        
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export const resetPassword= async(req,res,next)=>{
    try {
        const {id}= req.params

        const updatedUser= await userModel.findByIdAndUpdate(id, {$set:{password:req.body.password}})
        return res.status(200).json({success:true, result:"Password Updated Successfully"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export const sendNotifications= async(req, res, next)=>{
    try{
        const {id}=req.params;
        const {subject, message}= req.body;
        console.log({subject, message})
        const thisUser= await  userModel.findById(id);
        if(!thisUser){
            return res.status(404).json({success:false, result:"User not found"})
        }
        const html= notificationTemplate({name:thisUser.firstName,subject,message}).html;
        console.log({html})
         await sendMail({to:thisUser.email,html, subject})
        return res.status(200).json({success:true, result:"Notification sent Successfully"})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }
}
export const createPlan= async(req,res,next)=>{
    try {
         const newPlan= await plansModel.create(req.body);
         return res.status(200).json({success:true, result:"Plan created SuccessFully"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
    
}

export const getPlans= async(req,res,next)=>{
        try {
            const allPlans= await plansModel.find({})
            return res.status(200).json({success:true,  result:allPlans})
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    }
    export const editPlan=async(req,res,next)=>{
        try{
        const  {id}= req.params
        const   updatedUser= await plansModel.findByIdAndUpdate(id, {$set:req.body})
            return res.status(200).json({success:true, result:"Plan Updated Successfully"})
    }
        catch(err){
            console.logo(err.message)
            next(err)
        }
    }
    export const  setWallets= async(req,res,next)=>{
        try{

            const newWallets= await walletsModel.findOneAndUpdate({id:"investify"},{wallets:req.body});
            res.status(200).json({success:true,result:"Wallets updated successfully" })

        }catch(err){
            console.log(err.message)
            next(err)
        }
    }
    export const getWallets= async(req,res,next)=>{
        try{
            const walletData= await walletsModel.findOne({id:"investify"})
            const {wallets}= walletData 
            return res.status(200).json({success:true, result:wallets})

        }catch(err){
            console.log(err.message)
            next(err)
        }
    }