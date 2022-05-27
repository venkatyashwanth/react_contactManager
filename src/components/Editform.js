import React,{useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContactById } from '../config/Myservice';
import { editContact } from '../config/Myservice';

export default function Editform() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [info,setInfo] = useState({}); //accessed from database
    const [data,setData] = useState({}); //New Data from form. 

    const initialError = {nameErr:'',emailErr:'',phoneErr:''};
    const [error,setError] = useState(initialError);

    let initialVerifaction = {cname: true, cemail: true, cphno: true};
    const [vd,setvd] = useState(initialVerifaction);
    
    useEffect(()=>{
        getContactById(id)
        .then(res => {
            setInfo(res.data);
        })
        .catch(err => console.log(err))
    },[])


    const handleData = (e) => {
        let {name,value} = e.target;
        setData({...data,[name]:value});
    }

    

    const handleSubmision = (e) =>{
        e.preventDefault();
        setError(validate(data));
        if(vd.cname && vd.cemail && vd.cphno){
            editContact(id,data)
            .then(res=>{
                alert("Contact Updated");
                navigate("/");
            })
            .catch(err => console.log(err))        
        }else{
            alert("Please fill all the fields")
        }
    }

    const finishEdit = () => {
        setData({...info,...data});
    }
    

    const validate = (data) =>{
        const errors = {}
        //Name Validation
        let value;
        if(!data.pname){
            value = "* Required";
            errors.nameErr = value;
        }else if(data.pname.length < 4 || data.pname.length > 16){
            value = "Length should be 4 to 12 characters";
            errors.nameErr = value;
        }
        else{
            value = "";
            errors.nameErr = value;
        }

        // Email Validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if(!data.pemail){
            value = "* Required";
            errors.emailErr = value;
        }
        else if(!regex.test(data.pemail)){
            value = "* Invalid email format";
            errors.emailErr = value;
        }
        else{
            value = "";
            errors.emailErr = value;
        }

        //Phone Validation
        const phoneReg = /^[0-9]*$/;
        if(!data.pcno){
            value = "* Required";
            errors.phoneErr = value;
        }else if(!phoneReg.test(data.pcno)){
            value = "* Invalid Phone Number";
            errors.phoneErr = value;
        }else if(data.pcno.length < 10 ){
            value = "* must have 10 numbers";
            errors.phoneErr = value;
        }
        else{
            value = "";
            errors.phoneErr = value;
        }
        return errors;
    }

    const validateName = () => {
        if(!data.pname){
            const value = "* Required";
            setError({...error,nameErr: value});
            setvd({...vd,cname: false});
        }else if(data.pname.length < 4 || data.pname.length > 16){
            const value = "Length should be 4 to 12 characters";
            setError({...error,nameErr:value});
            setvd({...vd,cname: false});
        }
        else{
            const value = "";
            setError({...error,nameErr:value});
            setvd({...vd,cname: true});
        }
    }

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let value;
        if(!data.pemail){
            value = "* Required";
            setError({...error,emailErr: value});
            setvd({...vd,cemail: false});
        }
        else if(!regex.test(data.pemail)){
            value = "* Invalid email format";
            setError({...error,emailErr: value});
            setvd({...vd,cemail: false});
        }
        else{
            value = "";
            setError({...error,emailErr: value});
            setvd({...vd,cemail: true});
        }
    }

    const validatePhone = () =>{
        const phoneReg = /^[0-9]*$/;
        let value;
        if(!data.pcno){
            value = "* Required";
            setError({...error,phoneErr:value});
            setvd({...vd,cphno: false});
        }else if(!phoneReg.test(data.pcno)){
            value = "* Invalid Phone Number";
            setError({...error,phoneErr:value});
            setvd({...vd,cphno: false});
        }else if(data.pcno.length < 10 ){
            value = "* must have 10 numbers";
            setError({...error,phoneErr: value});
            setvd({...vd,cphno: false});
        }
        else{
            value = "";
            setError({...error,phoneErr: value});
            setvd({...vd,cphno: true});
        }
    }
    
    return (
        <>
            <div className='container mt-3'>
                <h3>Edit details: </h3>
                <form className='w-50 m-auto' onSubmit={handleSubmision}>
                    <div className='form-floating mb-3'>
                        <input type="text"  className='form-control' id="editInput1" placeholder='Enter your name' name="pname" defaultValue={info.pname} onChange={handleData} onBlur={validateName}/>
                        <label htmlFor='editInput1'>Name</label>
                        <p className='text-danger'>{error.nameErr}</p>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type="email" className='form-control' id="editInput2" placeholder='Enter your email' name="pemail" defaultValue={info.pemail} onChange={handleData} onBlur={validateEmail}/>
                        <label htmlFor='editInput2'>Email</label>
                        <p className='text-danger'>{error.emailErr}</p>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type="tel" className='form-control' id="editInput3" placeholder='Enter your number' name="pcno" defaultValue={info.pcno} onChange={handleData} onBlur={validatePhone}/>
                        <label htmlFor='editInput3'>Phone.No.</label>
                        <p className='text-danger'>{error.phoneErr}</p>
                    </div>
                    <button className='btn btn-warning me-2' type='button' onClick={finishEdit}>Finish Edit</button>
                    <input type="submit" value="Update" className='btn btn-success' />
                </form>
            </div>
        </>
    )
}
