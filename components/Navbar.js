import { Button } from "../components/lib";
import styled from "@emotion/styled";
import Logo from "./Logo";
import { useIdentityContext } from "react-netlify-identity-widget";


const Container = styled.header`
  border-bottom: 2px solid #9ad9c7;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: sticky;
  text-align: right;
  top: 0;
  z-index: 10;
  a {
    display: inline-block;
    font-weight: bold;
    padding: 10px;
    margin-left: auto;
    text-decoration: none;
    color: #425953;
  }
`;

export default function NavBar({ showBrandLogo }) {
  const identity = useIdentityContext();
  const handleLogout = () => identity.logoutUser();

  return (
    <Container>
      <div>{showBrandLogo ? <Logo width={35} height={35} /> : ""}</div>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Container>
  );
}