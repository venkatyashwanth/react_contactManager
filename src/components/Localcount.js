import React, { useContext, useRef } from 'react';
import { LocalCountContext } from './LocalContext'

export default function Localcount() {
    const count = useContext(LocalCountContext);
    console.log(count);
    return (
        <>
            <span>{count}</span>
        </>
    )
}
