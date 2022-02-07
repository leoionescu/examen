import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

export const Song = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, playlistId, title, url, stil } = state

    const updateSong = (e) => { 
        e.preventDefault()
        const t = e.target.title.value
        const u = e.target.url.value
        const s = e.target.stil.value
        if (t !== title || u !== url || s !== stil) {
            const req = '/api/songs/' + playlistId + '/' + id
            console.log('req: ' + req)
            fetch(req, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: t,
                    url: u,
                    stil: s
                })
            }).then(response => {
                    console.log('status: ' + response.status)
                    if (response.status === 204) {
                        navigate('/')
                    } else if (response.status === 500) {
                        alert('date incorecte')
                    }
                })
        } else {
            alert('descriere incorecta')
        }
    }

    const deleteSong = () => {
        const req = '/api/playlists/' + playlistId + '/' + id
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
    

    return (
        <div className="App" style={{ minWidth: 220, padding: 50 }}>
            <h1>{title}</h1>
            <a href={url}>{url}</a>
            <h3>{stil}</h3>

            <form className="form" onSubmit={updateSong}>
                <div className="input-group">
                    <label htmlFor="text">Title</label>
                    <input type="text" name="title" placeholder={title} />
                </div>
                <div className="input-group">
                    <label htmlFor="text">Url</label>
                    <input type="text" name="url" placeholder={url} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Stil</label>
                    <select name="stil">
                        <option value="pop">pop</option>
                        <option value="alternativ">alternativ</option>
                        <option value="rock">rock</option>
                        <option value="classic">classic</option>
                    </select>
                </div>
                <button className="primary" style={{marginBottom: 20}}>Update</button>
            </form>
            <button className="primary" style={{ marginBottom: 20 }} onClick={deleteSong}>Delete</button>
        </div>
    );
};

