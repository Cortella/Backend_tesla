const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriaSchema = new Schema({
    nome: {
        type: String,
        require: true,
        trim: true              
    },
    parentId: {
        type: String,
        riquire: true,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true
    },
    img: {
        type: String,
        trim: true
    },
})

/*
    {
    "nome" : "nome",
    "ano" : "2020",
    "subsistema": "xxxxxxxx",
    "Linkedin" : "http://xxxx..xxx.x",
    "img" : "rota"
    }
    
*/

const Categoria = mongoose.model('Categoria',CategoriaSchema)
module.exports = Categoria