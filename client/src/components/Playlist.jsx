import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export const Playlist = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, descriere, createdAt } = state
    const [songs, setSongs] = useState([])
    console.log('createdAt: ' + createdAt)
    const date = new Date(createdAt)
    console.log('date: ', date)

    const getSongs = () => {
        const req = '/api/songs/' + id
        fetch(req, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            console.log('response status: ' + response.status)
            if (response.status === 200) {
                response.json().then(json => {
                    console.log('json: ' + JSON.stringify(json));
                    setSongs(json)
                })
            }
        })
    }

    useEffect(() => {
        getSongs()
        console.log('useEffect')
    }, [])

    const updatePlaylist = (e) => { 
        e.preventDefault()
        const d = e.target.descriere.value
        console.log('descriere: ' + d)
        if (d !== descriere && d.length !== 0) {
            const req = '/api/playlists/' + id
            console.log('req')
            fetch(req, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descriere: d
                })
            }).then(response => {
                    console.log('status: ' + response.status)
                    if (response.status === 204) {
                        navigate('/')
                    } else if (response.status === 500) {
                        alert('descriere prea scurta')
                    }
                })
        } else {
            alert('descriere incorecta')
        }
    }

    const deletePlaylist = () => {
        const req = '/api/playlists/' + id
        fetch(req, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
                console.log('status: ' + response.status)
                if (response.status === 204) {
                    navigate('/')
                } else {
                    alert('nu s-a reusit operatiunea de delete')
                }
            })
    }

    const createSong = () => {
        navigate('/createSong/', { state: { id, descriere, createdAt } })
    }

    const handleClick = (song) => {
        navigate('/song/' + song.id, { state: { id: song.id, playlistId: id, title: song.title, url: song.url, stil: song.stil } })
    }

    return (
        <div className="App" style={{ minWidth: 220 }}>
            <form className="form" onSubmit={updatePlaylist}>
                <div className="input-group">
                    <label htmlFor="text">Descriere</label>
                    <input type="text" name="descriere" placeholder={descriere} />
                </div>
                <div className="input-group">
                    <label htmlFor="text">Created at:</label>
                    <label htmlFor="text">{date.toString()}</label>
                </div>
                <button className="primary" style={{marginBottom: 20}}>Update</button>
            </form>
            <button className="primary" style={{ marginBottom: 20 }} onClick={deletePlaylist}>Delete</button>
            <button className="primary" style={{ marginBottom: 20 }} onClick={createSong}>Create Song</button>
            <h2 style={{ marginBottom: 20 }} >Songs</h2>
            {songs.map((song, index) =>
                <div key={index} onClick={() => handleClick(song)}>
                    {song.title}
                </div>)}
        </div>
    )
};
