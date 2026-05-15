import {connect} from 'mongoose'



const connect_DB=(mongo_uri)=>{
    return connect(mongo_uri)
}


export  default connect_DB