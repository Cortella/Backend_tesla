const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/validation-contract')
const repository = require('../repositories/product-repository')

exports.get = async(req,res,next) => {
  try{
    let data = await repository.get()
    res.status(200).send(data)
  }catch (e){
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getBySlug = async(req,res,next) => {
  try{
    let data = await repository.getBySlug(req.params.slug)
    res.status(200).send(data)
  }catch(e) {
      res.status(500).send({
        message: "Falha ao buscar produtos"
      })
    }
}

exports.getByTag = async (req,res,next) => {
  try{
    let data = repository.getByTag(req.params.tag)
    res.status(200).send(data)
  } catch(e) {
    res.status(500).send({
      message: "Falha ao buscar produtos"
    })
  }
}


exports.post = async(req,res,next) => {

  let contract = new ValidationContract()
  contract.hasMinLen(req.body.name,3,'O Nome deve ter pelo menos 3 caracteres')

  if(!contract.isValid()){
    res.status(400).send(contract.errors()).end()
    return
  }
  try{
    await repository.create(req.body)
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    })
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao cadastrar o produto'
    })
  }
}


exports.put = async(req,res,next) => {
  try{
    await repository.update(req.params.id,req.body)
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    })
  }catch (e){
    res.status(400).send({
      message: 'Falha ao cadastrar produto'
    })   
  }
}

exports.delete = async(req,res,next) => {
  try{
    repository.delete(req.params.id,req.body)
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    })
  } catch(e){
    res.status(400).send({
      message: 'Falha ao remover produto'
    })   
  }
}