const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const User = require('../models/user')

exports.singin = async(req,res) =>{
  const data = {...req.body}
  if(!data.email || !data.password) {
    return res.status(400).send('Informe Usuário e senha')
  }

  const user = await User.findOne({email: data.email})

  if(!user) return res.status(400).send('Usuario nao encontrado')

  const isMatch = bcrypt.compareSync(data.password,user.password)
  if(!isMatch) return res.status(401).send('Dados invalidos')

  const now = Math.floor(Date.now() / 1000)

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    admin: user.admin,
    issuedAt: now,
    exp: now + (60*60*24*3)
  }

  res.json({
    ...payload,
    token: jwt.encode(payload, process.env.AUTH_SECRET)
  })

}
const validateToken = async (req,res) => {
  const userData = req.body || null
  try{
    if(userData) {
      const token = jwt.decode(userData.token, process.env.AUTH_SECRET)
      if(new Date(token.exp * 1000) > new Date()){
        return res.send(true)
      }  
    }
  } catch(e) {
    
  }
}