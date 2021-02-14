import { useEffect } from "react";
import Subscriptions from "../../components/Subscriptions";

export default function Customer( ) {

  const getCustomer = () =>{
    fetch('/.netlify/functions/get-customer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
      },
    })
    .then((res)=>res.json())
    .catch((err)=>console.error(err))
  }

  useEffect(()=>{
    console.log("AICICI");
    getCustomer();
  },[])

  return (
    <>
      <h1>Choose a subscription plan</h1>
      <Subscriptions />
    </>
  );
}

// export async function getStaticPaths() {
//   const customers = [{id:1, id:2, id:9}]

//   const paths = customers.map((customer) => ({
//     params: { id: customer.id },
// }))
// return {
//   paths: [
//     { params: { id: '1' } },
//     { params: { id: '2' } },
//     { params: { id: '9' } }
//   ],
//   fallback: false
// }
// }

// export async function getStaticProps({ params }) {
//   const res = await fetch(`http://localhost:3000/customer/${params.id}`);

//   const customer = await res.json();

//   return {
//     props: { id: 1 },
//   };
// }
