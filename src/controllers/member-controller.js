const repository = require('../repositories/member-repository')
const contract = require('../validators/validation-crud')
const sponsor = require('../controllers/sponsors-controller')

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

exports.getBySub = async(req,res,next) => {
    try{
        let data = await repository.getBySub(req.params.sub)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: e
        })
    }
}

exports.getById = async(req,res,next) =>{
    try{
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Membro não encontrado'
        })
    }
}

exports.getByYear = async(req,res,next) =>{
    try{
        let data = await repository.getByYear(req.params.year)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Equipe não encontrada'
        })
    }
}

exports.post = async(req,res,next) => {   
    const member = {...req.body}
    try{
        contract.existsOrError(member.name, 'Nome nao informado!')
        contract.hasMinLen(member.name,3, 'Nome precisa ter ao menos 3 caracteres')
        contract.existsOrError(member.data[0].subsystem, 'subsistema não informado!')
        contract.existsOrError(member.data[0].year, 'Pelo menos um ano deve ser cadastrado')
        
        await repository.create(req.body)
       
        res.status(201).send({
            message: 'Membro cadastrado com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: e
        })
    }
}

exports.put = async(req,res,next) => {

    const member = {...req.body}
    
    try{
        
        contract.existsOrError(member.name, 'Nome nao informado!')
        contract.hasMinLen(member.name,3, 'Nome precisa ter ao menos 3 caracteres')
        contract.existsOrError(member.data[0].subsystem, 'subsistema não informado!')
        contract.existsOrError(member.data[0].year, 'Pelo menos um ano deve ser informado')
        await repository.update(req.params.id,req.body)
            res.status(200).send({
                message: 'Usuario atualizado com sucesso!'
            })
    } catch(e){
        res.status(500).send({
            message: e
        })
    }
}   

exports.delete = async(req,res,next) => {
    try{
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'Membro removido com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: e
        })
    }
}