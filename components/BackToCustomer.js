import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function BackToCustomer({ full_name }) {
  return (
    <Link
      href={{
        pathname: `/customer/${full_name}`,
      }}
      passHref
    >
      <FaArrowLeft />
    </Link>
  );
}
