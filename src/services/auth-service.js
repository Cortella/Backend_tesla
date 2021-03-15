const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_KEY, {expiresIn: '3d'})
}

exports.decodeToken = async (token) => {
  let data = await jwt.verify(token, process.env.SALT_KEY)
  return data
}

exports.autorize = function (req,res,next) {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if(!token) {
    res.status(401).json({
      message: 'Acesso Restrito'
    })
  } else {
    jwt.verify(token, process.env.SALT_KEY, function (error, decoded){
      if(error) {
        res.status(401).json({
          message: 'Token Invalido'
        })
      }else {
        next()
      }
    })
  }

}