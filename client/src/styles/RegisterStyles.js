// 📌 styles/RegisterStyles.js
import styled from "styled-components";
import { Button, Container } from "./SharedStyles"; // Import shared styles

export const RegisterContainer = styled(Container)`
  width: 100%;
`;

export const RegisterBox = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const RegisterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;
`;

export const RegisterButton = styled(Button)``; // Reusing the shared button
