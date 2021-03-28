import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function BackToCustomer({ id }) {
  return (
    <Link
      href={{
        pathname: `/customer/${id}`,
      }}
      passHref
    >
      <FaArrowLeft />
      
    </Link>
  );
}
