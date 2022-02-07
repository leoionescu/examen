import express from 'express';
import { Playlist, Song } from './repository.mjs';
import Sequelize from 'sequelize';
import { getRecords, postRecords, deleteRecords, getRecord, deleteRecord, putRecord } from './service.mjs'
const router = express.Router()

router.route('/playlists')
    .get(async (req, res) => getRecords(Playlist, req, res))
    .post(async (req, res) => postRecords(Playlist, req, res))
    .delete(async (req, res) => deleteRecords(Playlist, req, res))

router.route('/playlists/:id')
    .get(async (req, res) => getRecord(Playlist, req, res))
    .put(async (req, res) => putRecord(Playlist, req, res))
    .delete(async (req, res) => deleteRecord(Playlist, req, res))

router.route('/songs/:id') //id reprezinta id-ul playlistului
    .get(async (req, res) => {
        try {
            let playlist = await Playlist.findByPk(req.params.id)
            if (playlist) {
                let songs = await playlist.getSongs()
                if (songs.length > 0) {
                    res.status(200).json(songs)
                } else {
                    res.status(204).send()
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })
    .post(async (req, res) => {
        console.log('playlistId: ' + req.params.id)
        try {
            let playlist = await Playlist.findByPk(req.params.id)
            if (playlist) {
                let song = await Song.create(req.body)
                res.status(201).location(`http://${req.headers.host}${req.baseUrl}${req.url}/${song.id}`).send()
                playlist.addSong(song)
            } else {
                res.status(400).send
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })
    

router.route('/songs/:playlistId/:id')
    .put(async (req, res) => putRecord(Song, req, res))
    .delete(async (req, res) => deleteRecord(Song, req, res))

router.route('/playlists/filtrare2campuri/:descriereLike/:startDate')
    .get(async (req, res) => {
        try{
        const Op = Sequelize.Op;
        console.log('startDate: ' + req.params.startDate)
        let playlists = await Playlist.findAll({
            where: {
                createdAt: {
                    [Op.between]: [req.params.startDate, new Date()]
                    // $between: [new Date(req.params.startDate), new Date()]
                },
                descriere: {
                [Op.like]: '%' + req.params.descriereLike + '%'
                }                
            }
        })
        if (playlists.length > 0) {
            res.status(200).json(playlists)
        } else {
            res.status(204).send()
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })

router.route('/sortare')
    .get(async (req, res) => {
        console.log('sortare')
    //sortam dupa data
    try {
    let playlists = await Playlist.findAll({ limit: 10, order: [['updatedAt', 'DESC']] });
    if (playlists.length > 0) {
        res.status(200).json(playlists)
    } else {
        res.status(204).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export default router;