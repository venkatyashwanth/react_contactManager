import React, { useState,useEffect } from 'react';
import { getContacts, deleteContact } from '../config/Myservice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Editform from './Editform';

export default function Contacts() {
    const [info,setInfo] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getContacts()
        .then(res => setInfo(res.data))
        .catch(err => console.log(err))
    })

    const delContact = (id) => {
        if(window.confirm("Delete the contact?")){
            deleteContact(id)
            .then(res => {
                if(res){
                    alert("Contact Deleted");
                    getContacts()
                    .then(res => setInfo(res.data))
                    .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        }
    }

    const editContact = (id)=>{
        navigate("/edit"); 
        navigate(`/edit/${id}`);
    }


  return (
    <>
    <div className='container'>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th >S.No</th>
                <th >Name</th>
                <th >Email</th>
                <th >Contact.No.</th>
            </tr>
        </thead>
        <tbody>
            {info.map(data=>
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.pname}</td>
                <td>{data.pemail}</td>
                <td>{data.pcno}</td>
                <td>
                    <button className="btn btn-warning me-2" onClick={() => editContact(data.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => delContact(data.id)}>Delete</button>
                </td>
            </tr>
            )}
        </tbody>
    </table>
    </div>
    
    </>
  )
}
