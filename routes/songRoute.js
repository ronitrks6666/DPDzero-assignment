const Router = require('express').Router()
const songCtrl = require('../controller/songCtrl')
const auth = require('../middleware/auth')


Router.post('/new-song', auth , songCtrl.add_new_song);
Router.get('/all-song-list' , auth , songCtrl.list_all_song)
Router.patch('/update-song-data/:id' , auth , songCtrl.update_song_data)
Router.delete('/delete-song-data/:id' , auth , songCtrl.delete_song_data)

module.exports = Router