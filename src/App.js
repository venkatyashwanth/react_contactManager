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

function App() {
  return (
    <>
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
      
    </>
  );
}

export default App;
