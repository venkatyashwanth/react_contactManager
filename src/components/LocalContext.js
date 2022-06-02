import React, { useState, useEffect, useLayoutEffect } from 'react';
import Localcount from './Localcount';

export const LocalCountContext = React.createContext();
export default function LocalContext() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (localStorage.getItem("mycontacts") != undefined) {
            let arr = JSON.parse(localStorage.getItem('mycontacts'));
            setCount(arr.length);
        }
    }, [])

    return (
        <>
            <LocalCountContext.Provider value={count}>
                <Localcount />
            </LocalCountContext.Provider>
        </>

    )
}
