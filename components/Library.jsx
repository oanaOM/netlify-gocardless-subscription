import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaSpinner } from "react-icons/fa";
import * as Colors from "../styles/colors";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

const buttonVariants = {
  primary: {
    backgroundColor: Colors.GREEN_LIGHT,
    color: "white",
  },
  secondary: {
    background: Colors.PINK_DARKER,
    color: "black",
  },
  success: {
    background: Colors.GREEN_LIGHT,
    color: "black",
  },
  danger: {
    background: Colors.RED_DANGER,
    color: "white",
  },
  link: {
    background: "inherit",
    minWidth: "inherit",
  },
  info: {
    background: Colors.PINK_IVORY,
    color: "white",
  },
};

const Button = styled.button(
  {
    padding: "12px",
    border: "none",
    fontSize: "1rem",
    borderRadius: "20px",
    fontWeight: "bold",
    minWidth: "180px",
    color: "white",
    ":hover": {
      backgroundColor: `${Colors.GREEN_DARKER}`,
    },
    ":focus": {
      outline: "none",
    },
    "> a": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

const Input = styled.input(
  {
    backgroundColor: `${Colors.GREYISH}`,
    border: `1px solid ${Colors.WHITE_V2}`,
    borderRadius: "5px",
    color: `${Colors.GREEN_DARKER}`,
    fontSize: "1rem",
    lineHeight: 1.1,
    padding: "8px 12px",
    ":focus": {
      outlineColor: `${Colors.GREEN_DARKER}`,
    },
    fontStyle: "italic",
    margin: "40px 0",
  },
  (props) => ({ width: props })
);

const H1 = styled.h1({
  fontSize: "2.0rem",
  textAlign: "left",
});

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
  rowGap: "1rem",
  width: "500px",
});

const FormItem = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const FormButtons = styled.div({
  columnGap: "25px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
});

const FormButtonsHorizontal = styled.div({
  rowGap: "25px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

const FormInput = styled.input({
  width: "70%",
  padding: "0 15px",
  border: "2px solid LightGray",
  height: "40px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "'white'smoke",
  border: "2px solid LightGray",
});

const FormLabel = styled.label(
  {
    alignSelf: "center",
    color: "dimgray",
    width: "calc(100% / 3)",
    cursor: "pointer",
  },
  (props) =>
    props.isRequired
      ? {
          ":before": {
            content: '"* "',
            color: `${Colors.RED_DANGER}`,
            fontSize: "0.90rem",
          },
        }
      : {}
);

const CustomersListUL = styled.ul({
  listStyle: "none",
  padding: "0",
  marginBottom: "20px",
  width: "75vw",
});

const SelectDropdown = styled.select({
  width: "70%",
  padding: "0 15px",
  border: "2px solid LightGray",
  height: "40px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "'white'smoke",
  border: "2px solid LightGray",
});

export {
  Button,
  Input,
  H1,
  Spinner,
  CustomersListUL,
  Form,
  FormItem,
  FormInput,
  FormLabel,
  SelectDropdown,
  FormButtons,
  FormButtonsHorizontal,
};
