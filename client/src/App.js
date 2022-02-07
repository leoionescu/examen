import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Song } from "./components/Song";
import { CreatePlaylist } from "./components/CreatePlaylist";
import { CreateSong } from "./components/CreateSong";
import { Playlist } from "./components/Playlist";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="song/:id" exact element={<Song/>}></Route>
          <Route path="playlist/:id" exact element={<Playlist/>}></Route>
          <Route path="/createPlaylist" exact element={<CreatePlaylist/>}></Route>
          <Route path="/createSong" exact element={<CreateSong/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
