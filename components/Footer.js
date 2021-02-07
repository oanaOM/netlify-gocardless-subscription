import styled from "@emotion/styled";

export default function Footer() {
  const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    text-align: center;
    border-top: 1px solid #eaeaea;
    margin: 24px 0;
    padding: 24px;
    width: 100%;

  `;
  return (
    <>
      <Footer>
        Made with <img src="/heart_blue.svg" alt="love" /> for you
      </Footer>
    </>
  );
}
