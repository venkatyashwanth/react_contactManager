import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';
import Form from './components/Form';
import Dashbord from './components/Dashbord';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Editform from './components/Editform';
import Submitform from './components/Submitform';
import Contacts from './components/Contacts';
import {useState,useEffect} from 'react';
import { createContext } from 'react';

export const LocalCountCont = React.createContext();

function App() {
  const [count, setCount] = useState([]);

  const onCountUpdate = (data) => {
    setCount(data)
  }
    
    useEffect(() => {
        if (localStorage.getItem("mycontacts") != undefined) {
            let arr = JSON.parse(localStorage.getItem('mycontacts'));
            setCount(arr.length);
        }
    }, [])

  return (
    <>
    <LocalCountCont.Provider value={{count, onCountUpdate}}>
    <Router>
      <Header/>
      <Dashbord/>
      <Routes>
        <Route path="/" element={<Contacts/>}></Route>
        <Route path="/add" element={<Form/>}></Route>
        <Route path="/edit/:id" element={<Editform/>}></Route>
        <Route path="/success" element={<Submitform/>}></Route>
      </Routes>
    </Router>
    </LocalCountCont.Provider>
    </>
  );
}

export default App;
