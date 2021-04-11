import React from "react";
import { useState } from "react";
import { useAppState } from "@context/state";

import {
  Button,
  Form,
  FormInput,
  FormItem,
  FormLabel,
  FormButtons,
} from "./Library";
import * as Color from "../styles/colors";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function SubscriptionForm({ user }) {
  const [error, setError] = useState({ msg: false });

  const router = useRouter();

  const { subs } = useAppState();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = evt.target.elements;

    const data = {
      email: formData.email.value,
      family_name: formData.family_name.value,
      given_name: formData.given_name.value,
    };

    await axios.post("/api/customers", data).then((res) => {
      router.push(res.data.redirect_url);
    });

    return evt.target.elements;
  };

  const { category } = subs;

  return (
    <>
      <div>
        <h2>Welcome {user}!</h2>
        <p>{category}</p>
        {error.msg ? (
          <span className="error">Ups! something went wrong.</span>
        ) : null}
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
              fontSize: "0.85rem",
              fontStyle: "italic",
              textAlign: "right",
              width: "100%",
            }}
          >
            <small style={{ color: `${Color.RED_DANGER}`, content: "*" }}>
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
