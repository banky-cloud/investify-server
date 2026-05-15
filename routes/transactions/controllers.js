import transactionModel from "../../models/transactionModel.js";
import userModel from "../../models/userModel.js";


 export const deposit= async(req, res, next)=>{
    try{
        const {user}=req
        const userId= user.id;
        const newTransaction= await transactionModel.create({...req.body,user:userId,transaction_type:"deposit"})
        const updatedUser= await userModel.findByIdAndUpdate(userId, {$push:{transactions:newTransaction._id}});
        return res.status(201).json({success:true, result:"Transaction was created Successfully and is awaiting approval"})
    }
    catch(err){
        console.log(err.message);
        next(err);
    }

}

export const withdraw= async(req,res,next)=>{
    try {
        const user= req.user.id
        const newTransaction= await transactionModel.create({...req.body,imgUrl:"none", transaction_type:"withdrawal", user})
        
        return res.status(200).json({success:true, result:"Your request has been submitted and is awaiting approval"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export const  approveTransaction= async(req,res,next)=>{
    try {
        const {id}= req.params
        console.log(id)
        // check if the transaction exists in the database

            const thisTransaction= await transactionModel.findById(id)
            console.log(thisTransaction)
            if(!thisTransaction){
                return res.status(500).json({success:false, result:"Transaction has expired or been deleted"})
            }
            
                if(thisTransaction.status==="approved"){
                    return res.status(200).json({success:true, result:"Transaction already approved"})
                }
            
        
        const transactionOwner= await userModel.findById(thisTransaction.user)
        console.log({transactionOwner})
        const    updatedTransaction= await transactionModel.findByIdAndUpdate(id,{$set:{status:"approved"}});
        const {transaction_type}= updatedTransaction._doc
        const multiplier= transaction_type==="withdrawal"?-1:1;
        
    

        if(!transactionOwner){
            return res.status(500).json({success:false, result:"Transaction has an invalid signee"})
        }
        if(updatedTransaction ){
            const updatedUser= await userModel.findByIdAndUpdate(updatedTransaction.user,{$inc:{balance:updatedTransaction.amount*multiplier}}, {new:true})
            // credit the referrer on the first transaction of the referee
            const isFirstTransaction= transactionOwner.transactions.length===1;
            console.log(transactionOwner.transactions)
            console.log({isFirstTransaction})
            if(isFirstTransaction){

                const {referrer}=updatedUser._doc
                // console.log(updatedUser)
                console.log({transaction_type})
                if(referrer&&(transaction_type==="deposit")){
                    console.log(referrer)
                    // console.log(updatedUser)
                    console.log({referrer})
                    const bonus= 0.1*thisTransaction.amount
                    const referrersTransaction= await transactionModel.create({transaction_type:"referral_bonus",user:referrer, amount:bonus,imgUrl:"none",status:"approved"})
                    const updatedReferrer= await userModel.findByIdAndUpdate(referrer,{$inc:{balance:bonus},$push:{transactions:referrersTransaction._id}})
                }
            }
        
        }
        
        return res.status(200).json({success:true, result:"Transaction Approved"})
        
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

export const  invest= async(req,res,next)=>{
    try {
        const {id}= req.user
        const newTransaction=await transactionModel.create({...req.body,user:id,transaction_type:"investment",imgUrl:"none", status:"approved"});
        const  updatedUser=await userModel.findByIdAndUpdate(id,{$inc:{balance:newTransaction.amount*-1},$push:{transactions:newTransaction._id}})
        return res.status(200).json({success:true, result:"investment successful"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export const declineTransaction=async(req,res,next)=>{
    try {
        const {id}= req.params
        const updatedTransaction=await transactionModel.findByIdAndUpdate(id, {$set:{status:"declined"}}) ;
        return res.status(200).json({success:true, result:"Transaction has been declined"})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}