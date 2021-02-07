import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "../components/lib";
import { useRouter } from "next/router";

const Box = styled.section`
  border: 1px solid #9ad9c7;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 28px;
  max-width: 300px;
  height: 400px;
  margin: 25px;
  text-align: center;
`;

export default function SubscriptioBox({
  title,
  description,
  subscription,
  imgSRC,
}) {
  const router = useRouter();

  const handleSubscription = (e) => {
    e.preventDefault();
    localStorage.setItem("subscription", e.target.innerText);
    router.push("/subscribe");
  };

  return (
    <Box>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={`/${imgSRC}`} width="50%" height="auto" />
      <Button onClick={handleSubscription}>
        {subscription}
      </Button>
    </Box>
  );
}
