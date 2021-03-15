const mongoose = require('mongoose')
const Gallery = mongoose.model('Gallery')


exports.get = async() => {
    const res = await Gallery.find({})
    return res
}

exports.getById = async(id) => {
    const res = await Gallery.findById(id)
    return res
}
 exports.getByYear = async(y) => {
     year = parseInt(y)
    const res = await Gallery.aggregate([
        {$match: {"data.year":year}}
    ])
    return res
 } 

exports.create = async(data) => {
    let check =  await Gallery.findOne({ year: data.year })
    if(check){
        throw("A galeria ja esta cadastrado na base de dados")
    }else{
        let gallery = new Gallery(data);
        await gallery.save()
    }
    
}

exports.update = async(id , d) => {
    check = await Gallery.findOne({_id: id})
    if(check){
        await Gallery
        .findOneAndUpdate({_id : id}, {
            $set: {
                year: d.year
            }
        })
    }else{
        throw("Galeria não encontrado")
    }
    
}

exports.delete = async(id) => {
    const filter = {_id : id}
    const res = await Gallery.findOneAndDelete(filter)
    if(!res){
        throw "Galeria não encontrada"
    }
    return res
}