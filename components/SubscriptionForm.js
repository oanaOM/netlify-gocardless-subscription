import {
  Button,
  Form,
  FormInput,
  FormItem,
  FormLabel,
  FormButtons,
} from "./Library";
import * as Color from "../styles/colors";
import { useRouter } from "next/router";
import Link from "next/link";
import { addSubscription } from "../lib/service";
import {useState} from 'react';

export default function SubscriptionForm() {
  const router = useRouter();

  const [subscription, setSubscription] = useState();
  const [error, setError] = useState({msg: false});

  function handleSubmit(e) {
    e.preventDefault();
    const data = e.target.elements;

    const newSubscription = {
      given_name: data.given_name.value,
      family_name: data.family_name.value,
      email: data.email.value,
    };

    addSubscription(newSubscription)
    .then(({ data }) => {
      console.log(data);
      //setSubscription(data);
    })
    .catch(()=>setError({msg: true}))

    return e.target.elements;
  }

  return (
    <>
      <div>
        <h2>Basic Subscription</h2>
        {error.msg ? <span className="error">Ups! something went wrong.</span> : null}
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <FormLabel htmlFor="given_name" isRequired>
              Given name
            </FormLabel>
            <FormInput type="text" id="given_name" required />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="family_name" isRequired>
              Family name
            </FormLabel>
            <FormInput type="text" id="family_name" />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email" isRequired>
              Email
            </FormLabel>
            <FormInput type="text" id="email" />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="address_line1">Address line 1</FormLabel>
            <FormInput type="text" id="address_line1" />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="city">City</FormLabel>
            <FormInput type="text" id="city" />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="postal_code">Postal code</FormLabel>
            <FormInput type="text" id="postal_code" />
          </FormItem>

          <p
            style={{
              fontStyle: "italic",
              fontSize: "0.85rem",
              width: "100%",
              textAlign: "right",
            }}
          >
            <small style={{ content: "*", color: `${Color.RED_DANGER}` }}>
              *{" "}
            </small>
            Required fields
          </p>
          <FormButtons>
            <Button type="button" variant="info">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </FormButtons>
        </Form>
      </div>
    </>
  );
}
