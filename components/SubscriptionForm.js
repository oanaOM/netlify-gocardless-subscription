import {
  Button,
  Form,
  FormInput,
  FormItem,
  FormLabel,
  FormButtons,
} from "./Lib";
import * as Color from "../styles/colors";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SubscriptionForm() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    // const data = e.target.elements;
    // const formData = {
    //   given_name: data.given_name.value,
    //   family_name: data.family_name.value,
    //   email: data.email.value,
    //   address_line1: data.address_line1.value,
    //   city: data.city.value,
    //   postal_code: data.postal_code.value,
    // };

    // client("http://localhost:3000/api/customers", { data: formData })
    //   .then((response) => {
    //     console.log("POST response here!!! ", response);
    //     router.push(response.message);
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error);
    //     console.error(error);
    //   });

    return e.target.elements;
  }

  return (
    <>
      <div>
        <h2>Basic Subscription</h2>
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
              Next
            </Button>
          </FormButtons>
        </Form>
      </div>
    </>
  );
}
