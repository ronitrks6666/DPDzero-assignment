const mongoose = require('mongoose')


const songSchema = mongoose.Schema({
    name:{type:String},
    description:{type:String},
    cover_album:{type:String},
    mp3_file:{type:String},
    artist_name:{type:String},
    user: {type: mongoose.Types.ObjectId, ref: 'userAuth'},
})

const songModel = mongoose.model('song_data', songSchema)
module.exports = songModel