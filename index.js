import express from "express"
import {config} from "dotenv"
import connect_DB from "./connectDb.js"
import userModel from "./models/userModel.js"
import transactionModel from "./models/transactionModel.js"
import errorhandler from "./errorhandler.js"
import userRouter from "./routes/users/userRoute.js"
import cors from "cors"
import transactionRouter from "./routes/transactions/transactionRoute.js"
import { differenceInHours, differenceInMinutes } from "date-fns"
import { google } from  "googleapis";
import tokenModel from "./models/tokensModel.js"
import { welcomeTemplate } from "./emailTemplates.js"
import googleAuthRoutes from "./routes/googleAuth.routes.js";
import { sendTestEmail } from "./controllers/email.controller.js"
import plansModel from "./models/plansModel.js"
import walletsModel from "./models/walletsModel.js"








config()
const server= express()
const port= process.env.PORT||3333

server.use(cors())
server.use(express.json())
// middlewares

server.use("/users",userRouter)
server.use("/transactions",transactionRouter)
server.use("/auth", googleAuthRoutes);

server.get("/email", sendTestEmail)

server.get("/",async(req,res, next)=>{
// get all investments
try{

    const allInvestments= await transactionModel.find({transaction_type:"investment"});
    const pendingInvestments= allInvestments.filter(x=>x.status!=="completed")
    
    Promise.all(pendingInvestments.map(async(investment)=>{
        const currentDate= new Date()
        const  investmentDate= new Date(investment.updatedAt);
        console.log(investmentDate)
        const timeDiff= differenceInHours(currentDate,investmentDate)
        const timeHasElapsed= timeDiff>investment.plan.durationInHours||timeDiff===investment.plan.durationInHours
        console.log(timeHasElapsed);
        if(timeHasElapsed){
            const updatedTransaction=await transactionModel.findByIdAndUpdate(investment._id,{$set:{status:"completed"}})
            const bonus=investment.amount*investment.plan.ROI/100
            const  userTransaction= await transactionModel.create({imgUrl:"none", user:investment.user, transaction_type:"earning",status:"approved", amount:bonus})
            const updatedUser= await userModel.findByIdAndUpdate(investment.user,{$inc:{balance:bonus}, $push:{transactions:userTransaction._id}})
        
        }
        
    }))
    
    return res.status(200).json({success:true, result:pendingInvestments})
}
catch(err){
    console.log(error.message)
}
})

// edit the functions for gmail auth





const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.domain}/auth`;


















const clearDb=async()=>{
    try {
        await userModel.deleteMany({})
        await transactionModel.deleteMany({})
    } catch (error) {
        console.log(error.message)
    }
}

server.use(errorhandler)
const startServer=async()=>{
    const uri= process.env.mongo_uri
   
    try{
    await connect_DB(uri)
    // await clearDb()
    const allUsers= await userModel.find({});
    const allTransactions= await transactionModel.find({})
    const allPlans= await plansModel.find({})
    const wallets= await walletsModel.find({})
    console.log({allPlans:allPlans.length})
    console.log({wallets})
    
    const subject="Welcome to Investify — Verify Your Email"
    const  recipient="chigbustephennamd@gmail.com"
    const html=welcomeTemplate

    server.listen(port, ()=>{console.log(`Server is listening on port ${port}`)})
    }
    catch(err){
        console.log(err)
    }
}


startServer()


