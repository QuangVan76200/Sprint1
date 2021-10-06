const mongoose = require('mongoose'); 
const Schema=mongoose.Schema;

const Accounts = new Schema({
    userName:{type: String, required: true },
    passWord:{type: String },
    active:{type: String},
    role: {type:String, default:''},
    IDUser:{type: Object},
    profilePicture:{
        type:String
    },
    follows:{
        type:Array,
        default:[{user:''}]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('accounts', Accounts)
