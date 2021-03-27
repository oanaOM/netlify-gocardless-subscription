import React from "react";
import { useEffect } from "react";
import axios from "axios";

const { faunaFetch } = require("../functions/utils/fauna");

export default function Hello({ data }) {
  
    console.log(data.data.getUserByGocardlessID.gocardlessID);
    
    return (
        <div>Hello</div>
    );
}




export async function getServerSideProps(context) {
  const data = await faunaFetch({
    query: `
      query {
        getUserByGocardlessID(gocardlessID: "2"){
          gocardlessID
          netlifyID
        }
      }
    `
  });

  return {
    props: {
      data,
    },
  };
}
