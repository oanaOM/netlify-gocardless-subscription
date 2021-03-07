import axios from "axios";
import React from "react";
import { useEffect } from "react";

useEffect(() => {
    axios.get("./netlify/functions/get-hello")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}, []);

export default function Hello () {
    return (
        <div>Hello</div>
    );
}
