import {useState} from 'react'
import { IdentityModal, useIdentityContext } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'
import "@reach/tabs/styles.css"


export default function Home() {
  const identity = useIdentityContext()
  const [dialog, setDialog]= useState(false)
  
  return (
    <>
    {identity && identity.isLoggedIn && (
      <div>
        <h2>identity</h2>
        <pre>{JSON.stringify(identity, null, 2)}</pre>
      </div>
    )}
      <h1>Sign up for premium meal deal for dogs</h1>
      <p>Get your subscription</p>
      {!dialog && (<button onClick={()=>setDialog(true)}>Log in</button>)}
      <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log('hello ', user?.user_metadata)}
          onSignup={(user) => console.log('welcome ', user?.user_metadata)}
          onLogout={() => console.log('bye ')}
        />
    </>
  );
}
