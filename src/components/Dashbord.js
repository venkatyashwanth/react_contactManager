import React from 'react';
import { Link } from 'react-router-dom';
import Contacts from './Contacts';

export default function Dashbord() {
    return (
        <div className='container mt-3'>
            <div>
                <Link className="btn btn-secondary me-2" to="/">
                    Home
                </Link>
                <Link className="btn btn-primary me-2" to="/add">
                    Add Contact
                </Link>
            </div>
        </div>
    )
}
