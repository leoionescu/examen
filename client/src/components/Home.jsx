import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

export const Home = () => {
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([])
    

    const getPlaylists = () => {
        // const req = '/api/playlists/filtrare2campuri/a/' + new Date(2012, 0, 1)
        const req = '/api/playlists/'
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
                    setPlaylists(json)
                })
            }
        })
    }

    const createPlaylist = () => {
        navigate('/createPlaylist')
    }

    const handleClick = (playlist) => {
        console.log('handleClick')
        console.log('playlist', playlist)
        navigate('/playlist/' + playlist.id, { state: { id: playlist.id, descriere: playlist.descriere, createdAt: playlist.createdAt } })
    }

    const sortare = () => {
        let req = '/api/sortare';
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
                    setPlaylists(json)
                })
            }
        })
    }

    const filtrare = () => {
        const req = '/api/playlists/filtrare2campuri/a/' + new Date(2012, 0, 1)
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
                    setPlaylists(json)
                })
            }
        })
    }

    

    useEffect(() => {
        getPlaylists()
        console.log('useEffect')
    }, [])


    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    let itemsPerPage = 5;

    useEffect(() => {
        console.log('pagination useEffect')
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(playlists.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(playlists.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, playlists]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % playlists.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    return (
        <div className="App" style={{ minWidth: 220 }}>
            <button className="primary" style={{marginBottom: 20}} onClick={createPlaylist}>Create playlist</button>
            <h2 style={{ marginBottom: 20 }} >Playlists</h2>
            {currentItems.map((playlist, index) =>
                <div key={index} onClick={() => handleClick(playlist)}>
                    {playlist.descriere} 
                </div>)}
            <button className="primary" style={{marginBottom: 20}} onClick={sortare}>Sortare dupa data ultimei actualizari</button>
            <button className="primary" style={{marginBottom: 20}} onClick={filtrare}>Filtrare</button>
            <div id="container">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}