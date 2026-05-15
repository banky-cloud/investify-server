import {model, Schema} from "mongoose"


const userSchema= new Schema({
    
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,

    },
    
password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    country:{
        type:{
            name:String,
            phone_code:String
        },
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    referrer:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    referees:{type:[{
        type:Schema.Types.ObjectId,
        ref:"users"

    }],
    default:[]
},
    transactions:{
        type:[{
        type:Schema.Types.ObjectId,
        ref:"transactions"

    }],
    default:[]
},
referral_code:{
    type:String,
    required:true
}
}, {timestamps:true})

const userModel=model("users", userSchema)
export default userModel;
