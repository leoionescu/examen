import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
export const CreateSong = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, descriere, createdAt } = state
    console.log('descriere: ' + descriere)

    const createSong = (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const url = e.target.url.value
        const stil = e.target.stil.value
        console.log('title: ' + title)
        console.log('url: ' + url)
        console.log('stil: ' + stil)
        const songId = uuidv4()
        const req = '/api/songs/' + id
            fetch(req, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: songId,
                    title: title,
                    url: url,
                    stil: stil
                })
            }).then(response => {
                    console.log('status: ' + response.status)
                    if (response.status === 201) {
                        navigate('/')
                    } else if (response.status === 500) {
                        alert('date incorecte')
                    }
                })
    }

    return (
        <div className="App" style={{ minWidth: 220 }}>
            <h1>Create Song</h1>
            <form className="form" onSubmit={createSong}>
                <div className="input-group">
                    <label htmlFor="text">Title</label>
                    <input type="text" name="title" placeholder="title" />
                </div>
                <div className="input-group">
                    <label htmlFor="text">Url</label>
                    <input type="text" name="url" placeholder="Url" />
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
                <button className="primary" style={{marginBottom: 20}}>Create song</button>
            </form>
        </div>
    );
};
