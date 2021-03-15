const repository = require('../repositories/member-repository')
const contract = require('../validators/validation-crud')

exports.get = async(req,res,next) => {
    try{
        let data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        })
    }
}

exports.getById = async(req,res,next) =>{
    try{
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Galeria não encontrado'
        })
    }
}

exports.getByYear = async(req,res,next) =>{
    try{
        let data = await repository.getByYear(req.params.year)
        res.status(200).send(data)
    }catch (e){
        res.status(500).send({
            message: 'Galeria não encontrada'
        })
    }
}

exports.post = async(req,res,next) => {   

    const gallery = {...req.body}

    try{
        contract.existsOrError(gallery.year, 'O campo Ano é requerido!')
        
        await repository.create(req.body)
       
        res.status(201).send({
            message: 'Galeria cadastrada com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: e
        })
    }
}

exports.put = async(req,res,next) => {

    const gallery = {...req.body}
    
    try{
        contract.existsOrError(gallery.year, 'O campo Ano é requerido!')
        await repository.update(req.params.id,req.body)
            res.status(200).send({
                message: 'Galeria atualizada com sucesso!'
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
            message: 'galaria removida com sucesso!'
        })
    } catch(e) {
        res.status(500).send({
            message: e
        })
    }
}