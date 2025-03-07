import styled from "styled-components";
import { Button, Container, Input } from "./SharedStyles"; // Import shared styles

export const RegisterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const RegisterBox = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const RegisterInput = styled(Input)`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;
`;

export const RegisterButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`; // Reusing the shared button