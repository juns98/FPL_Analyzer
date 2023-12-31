import Navbar from "../../components/Navbar";
import styled from "styled-components";

function About() {
  return (
    <Container>
      <Navbar />
      <Title>About</Title>
      <InfoBox>
        <InfoText>hello</InfoText>
      </InfoBox>
    </Container>
  );
}

export default About;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const InfoBox = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
`;

const InfoText = styled.h2`
  color: white;
`;
