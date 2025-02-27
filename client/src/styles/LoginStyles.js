// 📌 styles/LoginStyles.js
import styled from "styled-components";
import { Button, Container } from "./SharedStyles"; // Import shared styles

export const LoginContainer = styled(Container)`
  width: 100%;
`;

export const LoginBox = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px; /* Limit width */
  text-align: center;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;
`;

export const LoginButton = styled(Button)``; // Reusing the shared button
