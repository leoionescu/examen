import React from 'react';
import { Navigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export const CreatePlaylist = () => {
    const navigate = useNavigate();


    const createPlaylist = (e) => {
        e.preventDefault();
        console.log('descriere: ' + e.target.descriere.value);
        const id = uuidv4()
        const descriere = e.target.descriere.value
        if (descriere.length > 0) {
            const req = 'api/playlists'
            fetch(req, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    descriere: descriere
                })
            }).then(response => {
                    console.log('status: ' + response.status)
                    if (response.status === 201) {
                        navigate('/')
                    } else if (response.status === 500) {
                        alert('descriere prea scurta')
                    }
                })
        }
    }

    return (
        <div className="App" style={{ minWidth: 220 }}>
            <h1>Create Playlist</h1>
            <form className="form" onSubmit={createPlaylist}>
                <div className="input-group">
                    <label htmlFor="text">Descriere</label>
                    <input type="text" name="descriere" placeholder="Descriere" />
                </div>
                <button className="primary" style={{marginBottom: 20}}>Create playlist</button>
            </form>
        </div>
    );
};
