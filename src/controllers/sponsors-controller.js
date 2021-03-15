const contract = require('../validators/validation-crud')
const repository = require('../repositories/sponsors-repository')



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

exports.getById = async(req,res) =>{
    try{
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getByType = async(req,res) => {
    try{
        let data = await repository.getByType(req.params.type)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: e
        })
    }
}

exports.post = async(req,res) => {
    const sponsor = {...req.body}
    try{
        
        contract.existsOrError(sponsor.name, 'O patrocinador precisa ter um nome')
        contract.existsOrError(sponsor.type, 'O patrocinador precisa ter um tipo')
        contract.hasMinLen(req.body.description,20, 'A descrição não pode ter menos de 20 caracteres')
        await repository.create(sponsor)
        res.status(201).send({
            message: 'Patrocinador cadastrado com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: e
        })
    }
}

exports.put = async(req,res,next) => {

    const sponsor = {...req.body}
    try{
        contract.hasMinLen(sponsor.name,3, 'O nome deve ter pelo menos 3 caracteres')
        contract.hasMinLen(sponsor.description,20, 'A descrição não pode ter menos de 20 caracteres')
        contract.isRequired(sponsor.logo, 'O patrocinador precisa ter uma logo cadastrada!')
        await repository.update(req.params.id,sponsor)
            res.status(200).send({
                message: 'Patrocinador atualizado com sucesso!'
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
            message: 'Patrocinador removido com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao excluir patrocinador'
        })
    }
}
