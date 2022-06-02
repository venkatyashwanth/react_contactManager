import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';
// import LocalContext from './LocalContext';
import { LocalCountCont } from '../App';


export default function Dashbord() {
    const {count,onCountUpdate} = useContext(LocalCountCont);

    return (
        <div className='container mt-3'>
            <div>
                <Link className="btn btn-secondary me-2" to="/">
                    Home
                </Link>
                <Link className="btn btn-primary me-2" to="/add">
                    Add Contact
                </Link>
                <button type="button" className="btn btn-primary me-2">
                    Locol Contacts <span className="badge bg-secondary">{count.length}</span>
                </button>
            </div>
        </div>
    )
}
