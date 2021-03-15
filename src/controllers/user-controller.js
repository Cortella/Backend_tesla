//const ValidationContract = require('../validators/validation-contract');
const repository = require('../repositories/user-repository')
const contract = require('../validators/validation-crud')
const authService = require('../services/auth-service')

exports.get = async(req,res) => {
    try{
        let data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getById = async(req,res) => {
    try{
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}


exports.post = async(req,res,next) => {   
    const user = {...req.body}
    try{
        console.log('post user')
        contract.existsOrError(user.name, 'Nome nao informado!')
        contract.existsOrError(user.lastName, 'Sobrenome não informado!')
        contract.existsOrError(user.email, 'Email nao informado!')
        contract.existsOrError(user.password, 'Senha não informada!')
        contract.hasMinLen(user.password,8, 'Senhas precisam ter no mínimo 8 caracteres!')
        contract.equalsOrError(user.password, user.confirmPassword, 'Senhas nao conferem')
        contract.equalsOrError(user.email,user.confirmEmail,'Email nao informado')
        
        await repository.create(req.body)
        res.status(201).send({
            message: 'Usuario cadastrado com sucesso!'
        })
    } catch(e) {
        res.status(500).send(e)
    }
}

exports.authenticate = async(req,res,next) => {   
    const user = {...req.body}
    try{
        contract.existsOrError(user.name, 'Nome nao informado!')
        contract.existsOrError(user.email, 'Email nao informado!')
        contract.existsOrError(user.password, 'Senha não informada!')
        
        const access = await repository.authenticate({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const token = await authService.generateToken({email: access.email, name: access.name})

        
        res.status(201).send({
            token: token,
            data: {
                email: access.email,
                name: access.name
            }
        })
    } catch(e) {
        res.status(500).send(e)
    }
}



exports.put = async(req,res,next) => {
    const user = {...req.body}
    try{
        contract.existsOrError(user.name, 'Nome nao informado!')
        contract.existsOrError(user.lastName, 'Sobrenome não informado!')
        contract.existsOrError(user.email, 'Email nao informado!')
        contract.existsOrError(user.password, 'Senha não informada!')
        contract.hasMinLen(user.password,8, 'Senhas precisam ter no mínimo 8 caracteres!')
        contract.equalsOrError(user.password, user.confirmationPassword, 'Senhas nao conferem')
        contract.equalsOrError(user.email,user.confirmationEmail,'Email nao informado')
        await repository.update(req.params.id,req.body)
        res.status(200).send({
                message: 'Usuario atualizado com sucesso!'
            })
        
    } catch(e){
        res.status(500).send(e)
    }
}   

exports.delete = async(req,res,next) => {
    try{
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'Usuario removido com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao excluir usuario'
        })
    }
}