const mongoose = require('mongoose')
const Member = mongoose.model('Member')


exports.get = async() => {
    const res = await Member.find({})
    return res
}

exports.getById = async(id) => {
    const res = await Member.findById(id)
    return res
}
 exports.getByYear = async(y) => {
     year = parseInt(y)
    const res = await Member.aggregate([
        {$match: {"data.year":year}}
    ])
    console.log(res)
    return res
 } 

exports.getByUserId = async(id) => {
    const res = await Member.find({user: id})
    return res
}

exports.getBySub = async(sub) => {
    const res = await Member.aggregate([
        {$match: {"data.subsystem":sub}}
    ])
    return res
}

exports.create = async(data) => {
    let check =  await Member.findOne({ name: data.name })
    if(check){
        throw("O membro ja esta cadastrado na base de dados")
    }else{
        let member = new Member(data);
        await member.save()
    }
    
}

exports.update = async(id , d) => {
    check = await Member.findOne({_id: id})
    if(check){
        await Member
        .findOneAndUpdate({_id : id}, {
            $set: {
                name: d.name,
                linkedin: d.linkedin,
                data: d.data
            }
        })
    }else{
        throw("Patrocinador não encontrado")
    }
    
}

exports.delete = async(id) => {
    const filter = {_id : id}
    const res = await Member.findOneAndDelete(filter)
    if(!res){
        throw "Membro não encontrado"
    }
    return res
}