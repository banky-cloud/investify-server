import {Schema,model} from "mongoose"


const walletSchema= new Schema({
    id:{
        type:String,
        default :"investify",
        required:true,
        unique:true
    },
    wallets:[{}]
})
const walletsModel= model("wallets",walletSchema )
export default walletsModel
