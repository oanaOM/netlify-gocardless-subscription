import React from "react";
import { useEffect } from "react";


export default function Hello () {
    useEffect(()=>{
        // Client-side request are mocked by `mocks/browser.js`.
        fetch('/api/customers')
        .then((res) => res.json())
        .then((res)=>console.log("YOOOOOO", res))
    })
    return (
        <div>Hello</div>
    );
}
