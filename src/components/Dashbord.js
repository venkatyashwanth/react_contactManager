import React from 'react';
import { Link } from 'react-router-dom';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';



export default function Dashbord() {
    let [count,setCount] = useState(0);
    
    useEffect(()=>{
        if(localStorage.getItem("mycontacts")!= undefined){
            let arr = JSON.parse(localStorage.getItem('mycontacts'));
            console.log(arr);
            setCount(arr.length);
        }
    })

    return (
        <div className='container mt-3'>
            <div>
                <Link className="btn btn-secondary me-2" to="/">
                    Home
                </Link>
                <Link className="btn btn-primary me-2" to="/add">
                    Add Contact
                </Link>
                <button className='btn btn-light me-2'>Locol Contacts <span>{count}</span></button>
            </div>
        </div>
    )
}
