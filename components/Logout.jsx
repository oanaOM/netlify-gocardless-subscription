import React from "react";
import { useIdentityContext } from "react-netlify-identity";
import { Button } from "@components/Library";
import { useRouter } from "next/router";

export default function Logout() {
  const identity = useIdentityContext();
  const router = useRouter();

  const onLogout = () => {
    identity.logoutUser();
     router.push("/");
  } 
  return <Button variant="link" onClick={onLogout}>Logout</Button>;
}
