import { model, Schema } from "mongoose";

const  transactionSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    transaction_type:{
        type:String,
        enum:["earning", "deposit", "withdrawal", "investment","referral_bonus"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    plan:{
        name:String,
        ROI:Number,
        durationInHours:Number
    },
    
    status:{
        type:String,
        enum:["pending", "approved", "declined", "completed"],
        default:"pending"
    },
    coin:{
        type:String
    },
    address:{
        type:String
    },
    network:{
        type:String
    },
    isFiat:{
        type:Boolean
    },
    imgUrl:{
        type:String,
        required:true
    }
    
    
}, {timestamps:true})


const transactionModel=model("transactions", transactionSchema)
export default transactionModel