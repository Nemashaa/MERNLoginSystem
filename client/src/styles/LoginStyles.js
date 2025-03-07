import styled from 'styled-components';
import { Button, Container, Input } from './SharedStyles'; // Import shared styles

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const LoginInput = styled(Input)`
  margin-bottom: 10px;
`;

export const LoginButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`; // Reusing the shared button