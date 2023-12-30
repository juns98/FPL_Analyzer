import styled from "styled-components";
import colors from "../assets/colors/colors";

const Button = styled.button`
  font-family: "RobotoMono";
  background-color: ${colors.primary};
  color: ${colors.buttonText};
  border: none;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`;

export default Button;
