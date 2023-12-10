import Navbar from "../../components/Navbar";
import styled from "styled-components";

function Player() {
  return (
    <Container>
      <Navbar />
      <Title>Players</Title>
    </Container>
  );
}

export default Player;

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #333;
`;
