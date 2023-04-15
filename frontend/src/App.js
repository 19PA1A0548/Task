import './App.css';
import {useState} from "react";
import axios from "axios";
import Main from "./Main";
import Home from './Home';
import { useNavigate,Routes,Route } from "react-router-dom";
import Read from './Read';
import Update from "./Update";
import Delete from "./Delete";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Main/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/read' element={<Read/>}/>
          <Route exact path='/update' element={<Update/>}/>
          <Route exact path='/delete' element={<Delete/>}/>
        </Routes>
    </div>
  );
}

export default App;
