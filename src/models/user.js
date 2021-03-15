const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required:true,
        trim: true              
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "O email já está sendo usado"],
        lowercase: true

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    autor: {
        type: Boolean,
        defaut: false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    teslaMember: {
        type: Boolean,
        default: false
    },
    MemberId: {
        type: Schema.Types.ObjectId
    },
    TeslaCoins: {
        Type: Number,
        default: 0
    }
    

})

/*{
    "name" : "name",
    "lastName" : "machado",
    "email" : "bnmachado10@gmail.com",
    "confirmEmail": "bnmachado10@gmail.com"
    "password: "778452",
    "confirmPassword": "778452"


  }
    
*/

const User = mongoose.model('User',userSchema)
module.exports = User