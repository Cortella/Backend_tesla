const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

// /paste-name-sub
diretorio = dir => {
  let res = Object.create(null)
  if((dir.includes('-'))){
    let result = dir.split('-')
    let size = result.length
    switch(size){
      case 0:
        console.log("error array is not defined")
        break
      case 1:
        res.paste = result[0]
        break
      case 2:
        res.paste	= result[0]
        res.name	= result[1]
        break
      case 3:
        res.paste	= result[0]
        res.name	= result[1]
        res.sub = result[2]
        break
    }
    return res
  }
}


const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {

      let obj = diretorio(req.params.dir)
      console.log(obj.paste)
      file.paste = req.params.dir
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads",file.paste));
    },
    filename: (req,file,cb) => {
      crypto.randomBytes(16,(err, hash) => {
        if(err) cb(err)

        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: (req,file,cb) => {
      file.paste = req.params.dir
      const buck = process.env.BUCKET_NAME + "/" + file.dir
      cb(null, buck)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req,file,cb) => {
      
      crypto.randomBytes(16,(err, hash) => {
        if(err) cb(err)

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  })
}
module.exports = {
  dest: path.resolve(__dirname, '..','..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 1 * 1024 * 1024,
    },
  fileFilter: (req, file, cb) => {
  
    const  allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]
    if(allowedMimes.includes(file.mimetype)){
      cb(null, true)
    } else{
      cb(new Error("Formato de arquivo invalido!"))
    }
  },
}