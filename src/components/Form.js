import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { addContact } from '../config/Myservice';

export default function Form() {
    const initialData = {pname:'',pemail:'',pcno:''};
    const [info,setInfo] = useState(initialData);
    const initialError = {nameErr:'',emailErr:'',phoneErr:''};
    const [error,setError] = useState(initialError);
    let initialVerifaction = {cname: false, cemail: false, cphno: false};
    const [vd,setvd] = useState(initialVerifaction);
    const navigate = useNavigate();
    const handleData = (e)=>{
        let {name,value} = e.target;
        setInfo({...info,[name]:value});
    }

    const validateName = () => {
        if(!info.pname){
            const value = "* Required";
            setError({...error,nameErr: value});
            setvd({...vd,cname: false});
        }else if(info.pname.length < 4 || info.pname.length > 16){
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
        if(!info.pemail){
            value = "* Required";
            setError({...error,emailErr: value});
            setvd({...vd,cemail: false});
        }
        else if(!regex.test(info.pemail)){
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
        if(!info.pcno){
            value = "* Required";
            setError({...error,phoneErr:value});
            setvd({...vd,cphno: false});
        }else if(!phoneReg.test(info.pcno)){
            value = "* Invalid Phone Number";
            setError({...error,phoneErr:value});
            setvd({...vd,cphno: false});
        }else if(info.pcno.length < 10 ){
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

    

    const handleSubmision = (e) =>{
        e.preventDefault();
        setError(validate(info));
        if(vd.cname && vd.cemail && vd.cphno){
            addContact(info)
            .then(res => {
                if(res){
                    alert("Contact Added");
                    navigate("/success");
                }
            })
            .catch(err => console.log(err))            
        }else{
            alert("Please fill all the fields")
        }
    }

    const validate = (info) =>{
        const errors = {}
        //Name Validation
        let value;
        if(!info.pname){
            value = "* Required";
            errors.nameErr = value;
        }else if(info.pname.length < 4 || info.pname.length > 16){
            value = "Length should be 4 to 12 characters";
            errors.nameErr = value;
        }
        else{
            value = "";
            errors.nameErr = value
        }

        // Email Validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        
        if(!info.pemail){
            value = "* Required";
            errors.emailErr = value;
        }
        else if(!regex.test(info.pemail)){
            value = "* Invalid email format";
            errors.emailErr = value;
        }
        else{
            value = "";
            errors.emailErr = value;
        }

        //Phone Validation
        const phoneReg = /^[0-9]*$/;
        if(!info.pcno){
            value = "* Required";
            errors.phoneErr = value;
        }else if(!phoneReg.test(info.pcno)){
            value = "* Invalid Phone Number";
            errors.phoneErr = value;
        }else if(info.pcno.length < 10 ){
            value = "* must have 10 numbers";
            errors.phoneErr = value;
        }
        else{
            value = "";
            errors.phoneErr = value;
        }
        return errors;
    }
    
    
    return (
        <>
            <div className='container mt-3'>
                <h3>Enter details: </h3>
                <form className='w-50 m-auto' onSubmit={handleSubmision}>
                    <div className='form-floating mb-3'>
                        <input type="text" className='form-control' id="userInput1" placeholder='Enter your name' name="pname" onChange={handleData} onBlur={validateName}/>
                        <label htmlFor='userInput1'>Name</label>
                        <p className='text-danger'>{error.nameErr}</p>
                    </div>
                    
                    <div className='form-floating mb-3'>
                        <input type="email" className='form-control' id="userInput2" placeholder='Enter your email' name="pemail" onChange={handleData} onBlur={() => validateEmail()}/>
                        <label htmlFor='userInput2'>Email</label>
                        <p className='text-danger'>{error.emailErr}</p>
                    </div>
                    <div className='form-floating mb-3'>
                        <input type="tel" className='form-control' id="userInput3" placeholder='Enter your number' name="pcno" onChange={handleData} onBlur={() => validatePhone()}/>
                        <label htmlFor='userInput3'>Phone.No.</label>
                        <p className='text-danger'>{error.phoneErr}</p>
                    </div>
                    <input type="submit" value="Add" className='btn btn-primary'/>
                </form>
            </div>
        </>
    )
}
