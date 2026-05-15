import {Schema, model} from "mongoose"


const planSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{},
    durationInHours:{
        type:Number,
        required:true
    },
    ROI:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    features:[String]
})
const plansModel=model("plans", planSchema)

export default plansModel