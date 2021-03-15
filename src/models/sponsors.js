const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sponsorsSchema = new Schema({
    name: {
        type: String,
        trim: true              
    },
    description: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    type: {
        type:String,
        required:true
    },
    active: {
        type: Boolean,
        default: false,
    },
    logo: {
        type: String,
        trim: true
    }



})

/*
{
    "name" : "nome",
    "description" : "xptogfgfdgfdgfdgfdgfdgfdgfdgdfgfdgfdgdfgfdg",
    "link" : "http://google.com.br",
    "facebook" : "facebook.com/bnmachado",
    "type" : "gold",
    "instagram" : "https://instagram.com.br/bnmachado",
    "logo": "caminho"
}
*/


module.exports = mongoose.model('Sponsors',sponsorsSchema)