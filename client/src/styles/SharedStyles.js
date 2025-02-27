import styled from 'styled-components';

// Color palette
export const colors = {
  primary: '#4361ee',
  secondary: '#3f37c9',
  accent: '#4895ef',
  background: '#f8f9fa',
  lightGray: '#e9ecef',
  mediumGray: '#dee2e6',
  darkGray: '#6c757d',
  text: '#212529',
  white: '#ffffff',
  error: '#e63946',
  success: '#2a9d8f'
};

// Common container for all pages
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);
`;

// Form related components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${colors.text};
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.mediumGray};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

export const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    background-color: ${colors.mediumGray};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.p`
  color: ${colors.success};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

// Card component for dashboard items
export const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${colors.text};
  margin-bottom: 1rem;
`;

export const CardContent = styled.div`
  color: ${colors.darkGray};
`;

// Responsive grid layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;