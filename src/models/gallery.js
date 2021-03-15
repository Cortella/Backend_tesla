const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gallerySchema = new Schema({
    year: {
        type: Number,
        require: true,
        trim: true,
    },
    photos : [
      {
        img: {
          type: Schema.Types.ObjectId,
          trim: true
        },
        active: {
          type: Boolean
        },
        postedAt: {
          type: Date,
          default: Date.now
        }    
      }]
})

/*
    {
    "year" : "2020",
    "photos":[]
    }
*/

const Gallery = mongoose.model('Gallery',gallerySchema)
module.exports = Gallery