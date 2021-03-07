import axios from "axios";
import React from "react";
import { useEffect } from "react";


export default function Hello () {
    useEffect(() => {
        axios.get("./netlify/functions/get-hello")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    }, []);
    return (
        <div>Hello</div>
    );
}
