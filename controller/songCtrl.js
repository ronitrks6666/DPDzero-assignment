const SongModel = require("../models/songModel.js");



const songCtrl = {
    add_new_song: async (req, res) => {
        try {
            const { name, description, cover_album, mp3_file, artist_name } = req.body
            const songData = new SongModel({ name, description, cover_album, mp3_file, artist_name, user: req.user._id });
            songData.save()
            res.json({ Success: "New song data added ", data: songData });
            //
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    list_all_song: async (req, res) => {
        try {
            const songData = await SongModel.find({ user: req.user._id })
            res.json({ Success: "Data collected ", data: songData });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    update_song_data: async (req, res) => {
        try {
            const { name, description, cover_album, mp3_file, artist_name } = req.body
            const songData = await SongModel.findByIdAndUpdate({ _id: req.params.id },
                { name, description, cover_album, mp3_file, artist_name, user: req.user._id },
                {returnDocument:'after'}
            );
            res.json({ Success: "Song data Updated ", data: songData });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    delete_song_data : async(req,res)=>{
        try{
            const songData = await SongModel.findByIdAndDelete({_id:req.params.id})
            res.json({ Success: "Song data deleted ", data: songData });
        }
        catch(error){
            res.status(500).send({ error: error.message });
        }
    }

};

module.exports = songCtrl;
