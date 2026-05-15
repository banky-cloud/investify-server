import {Schema, model} from "mongoose"

const tokenSchema= new Schema({
    tokens:{},
    id:{
        type:String
    }
})
const tokenModel= model("tokens", tokenSchema)
export default tokenModel