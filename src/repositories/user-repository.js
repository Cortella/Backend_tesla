const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt-nodejs')

encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}


exports.authenticate = async(data) => {
    data.password = encryptPassword(data.password)
    const user = await User.findOne({
        email: data.email
    })
    if(!user){
        throw('error: email não encontrado')
    }else{
        const password = await bcrypt.compare(data.password, user.password)
            console.log('password')
        }
    } 


exports.get = async() => {
    const res = await User.find({})
    return res
}

exports.getById = async(id) => {
    const res = await User.findById(id)
    return res
}

exports.create = async(data) => {
    let check =  await User.findOne({ email: data.email})
    if(check){
        throw("O email já está sendo usado!")
    }else{
        data.password = encryptPassword(data.password)
   
        delete data.confirmPassword
        delete data.confirmEmail
    
        let user = new User(data);
        await user.save()
    }  
}

exports.update = async(id , data) => {
    let check = await Member.findOne({_id: id})
    if(check){
        data.password = encryptPassword(data.password)
        await User
        .findOneAndUpdate(id, {
            $set: {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            }
        })    
    }else{
        throw("Usuario não encontrado")
    }
    
}

exports.delete = async(id) => {
    const filter = {_id : id}
    const res = await Member.findOneAndDelete(filter)
    if(!res){
        throw "Usuario não encontrado"
    }
    return res
}