const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true              
    },
    linkedin: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    data: 
        [
            {
            
            office: {
                type:String,
                trim: true
            },
            img: {
                type: Schema.Types.ObjectId
            },
            subsystem: {
                type: String,
                enum: ['Baterias' , 'Aquisição', 'Site', 'Sem Classificação'],
                default: 'Sem Classificação',
                require: true
                },
            
            year: {
                type: Number,
                default: 2020
                }  
            }
            
        ]
    
})

/*
    {
    "name" : "nome",
    "linkedin" : "ulr",
        "data": [
            {
                "office": "cargo",
                "img": "diretorio",
                "subsystem": "Baterias",
                "year": "2020"
            }
        ]
    }
    
*/

const Member = mongoose.model('Member',memberSchema)
module.exports = Member