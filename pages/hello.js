import axios from "axios";
import React from "react";
import { useEffect } from "react";


export default function Hello () {
    useEffect(() => {
        axios.get("/.netlify/functions/get-hello")
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);
    return (
        <div>Hello</div>
    );
}
