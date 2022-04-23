import './App.css';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import MainPage from './Pages/Main';
import Showpost from './Pages/Showpost';
import Editpost from './Pages/Editpost';
import Editcomment from './Pages/Editcomment';
import userContext from './Pages/userContext';

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
          <Route path="/main" element={<MainPage />}/>
          <Route path="/main" element={<MainPage />} />
          <Route path="/Showpost" element={<Showpost />} />
          <Route path="/Editpost" element={<Editpost />} />
          <Route path="/Editcomment" element={<Editcomment />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
