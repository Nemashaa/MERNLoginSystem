// 📌 styles/HomeStyles.js
import styled from "styled-components";
import { Container } from "./SharedStyles"; // Import shared styles

export const HomeContainer = styled(Container)`
  width: 80%;
  text-align: center;
`;

export const HomeTitle = styled.h1`
  color: #333;
`;

export const HomeText = styled.p`
  font-size: 1.2rem;
  color: #666;
`;
