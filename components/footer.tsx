import React from "react";
import styled from "@emotion/styled";

export default function Footer() {
  return (
    <WrapperStyled>
      <StyledHr />
      <h3>&#169; All Right Reserved</h3>
    </WrapperStyled>
  );
}

const WrapperStyled = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledHr = styled.hr`
  width: 100%;
`;
