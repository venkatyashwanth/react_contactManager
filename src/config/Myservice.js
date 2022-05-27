import {APIURL} from "./URL";
import axios from 'axios';

function getContacts(){
    return axios.get(APIURL);
}

function getContactById(id){
    return axios.get(`${APIURL}${id}`);
}

function addContact(data){
    return axios.post(APIURL,data);
}

function deleteContact(id){
    return axios.delete(`${APIURL}${id}`);
}

function editContact(id,data){
    return axios.put(`${APIURL}${id}`,data);
}

export {getContacts,getContactById,addContact,editContact,deleteContact};