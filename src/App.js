import './App.css';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import MainPage from './Pages/Home';
import Showpost from './Pages/ShowPost';
import Editpost from './Pages/EditPost';
import Editcomment from './Pages/EditComment';
import userContext from './Context/userContext';

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [user, setUser] = useState();

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<MainPage />}/>
          <Route path="/Post/:id" element={<Showpost />} />
          <Route path="/Post/:id/edit" element={<Editpost />} />
          <Route path="/Post/:id/Comment/:id/edit" element={<Editcomment />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
