import Subscriptions from "../../components/Subscriptions";
import Head from "next/head";
import NavBar from "../../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIdentityContext } from "react-netlify-identity-widget";
import { Button } from "../../components/Library";

export default function Customer() {
  const [customer, setCustomer] = useState();
  const identity = useIdentityContext();

  const router = useRouter();
  const handleLogout = () => identity.logoutUser();


  useEffect(() => {
    setCustomer(router.query.id);
  }, []);
  return (
    <>
      <Head>
        <title>Happy Paws! </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar showBrandLogo={false} />
      <main>
      <Button onClick={handleLogout}>Logout</Button>
        <h1>Welcome {customer}!</h1>
        <h3>Choose a subscription plan</h3>
        <Subscriptions />
      </main>
    </>
  );
}
