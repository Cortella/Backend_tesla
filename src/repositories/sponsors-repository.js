const mongoose = require('mongoose');
const Sponsors = mongoose.model("Sponsors")

exports.get = async() => {
    const res = await Sponsors.find({})
    return res
}

exports.getById = async(id) => {
    const res = await Sponsors.findById(id)
    return res
}

exports.getByType = async(type) => {
   const res = await Member.aggregate([
       {$match: {"type":type}}
   ])
   return res
} 

exports.create = async(sponsor) => {
    console.log("entra no create")
    check =  await Sponsors.findOne({ name: sponsor.name })
    console.log(check)
    if(check){
        console.log("entra no if")
        throw("O Patrocinador ja esta cadastrado")
    }else{
        console.log("entra no else")
        let sp = new Sponsors(sponsor);
        await sp.save()
    }
    
}

exports.update = async(id , data) => {
    checkId = await Sponsors.findOne({_id: id})
    checkName = await Sponsors.findOne({name : data.name})
    console.log(getId(data.id))
    if(!checkName){
        if(checkId){
            await Sponsors
            .findOneAndUpdate({_id : id}, {
                $set: {
                    name: data.name,
                    description: data.description,
                    logo: data.logo,
                    link: data.link,
                    facebook: data.facebook,
                    type: data.type,
                    instagram: data.instagram,
                    active: data.active
                }
            })
        }else{
            throw("Patrocinador não encontrado")
        }
    }else{
        throw("Não é possível alterar pois o patrocinador já existe na base de dados")
    }
     
}

exports.delete = async(id) => {
    const filter = {_id : id}
    const res = await Sponsors.findOneAndDelete(filter)
    if(!res){
        throw "Patrocinador não encontrado"
    }
    return res
}