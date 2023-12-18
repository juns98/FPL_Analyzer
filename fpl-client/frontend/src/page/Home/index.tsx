import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { getTeamNameById } from "../../utils/getTeamNameById";

function Home() {
  const [topPointer, setTopPointer] = useState([]);
  const [topScorer, setTopScorer] = useState([]);
  const [topAssister, setTopAssister] = useState([]);
  const [topBonus, setTopBonus] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);

  const getTopData = async () => {
    const pointers = await axios.get("http://localhost:4000/top-players/pointers");
    const scorers = await axios.get("http://localhost:4000/top-players/scorers");
    const assisters = await axios.get("http://localhost:4000/top-players/assisters");
    const bonus = await axios.get("http://localhost:4000/top-players/bonus-pointers");
    const teamInfo = await axios.get("http://localhost:4000/team-info");

    console.log(teamInfo.data);
    console.log(scorers.data);
    // console.log(pointers.data);
    setTopPointer(pointers.data);
    setTopScorer(scorers.data);
    setTopAssister(assisters.data);
    setTopBonus(bonus.data);
    setTeamInfo(teamInfo.data);
  };

  useEffect(() => {
    getTopData();
  }, []);

  const getName = (data: any) => {
    if (data.first_name.length + data.second_name.length > 15) {
      return data.web_name;
    } else {
      return `${data.first_name} ${data.second_name}`;
    }
  };

  const innerData = (data: any, contents: string) => {
    return (
      <DataContainer>
        <LeftData>
          <LargeScreenOnly>{getName(data)}</LargeScreenOnly>
          <SmallScreenOnly>{data.web_name}</SmallScreenOnly>({getTeamNameById(teamInfo, data.team_code)})
        </LeftData>
        <RightData>{contents}</RightData>
      </DataContainer>
    );
  };
  return (
    <Container>
      <Navbar />
      <Header>
        <h1>Welcome to the FPL Helper</h1>
        <p>Hello People</p>
      </Header>

      <BoxContainer>
        <Box>
          <h3>Top Pointers</h3>
          {topPointer.length > 0
            ? topPointer.map((data: any) => {
                return innerData(data, data.total_points);
              })
            : null}
        </Box>
        <Box>
          <h3>Top Scorer</h3>
          {topScorer.length > 0
            ? topScorer.map((data: any) => {
                return innerData(data, data.goals_scored);
              })
            : null}
        </Box>
        <Box>
          <h3>Top Assister</h3>
          {topAssister.length > 0
            ? topAssister.map((data: any) => {
                return innerData(data, data.assists);
              })
            : null}
        </Box>
        <Box>
          <h3>Top Bonus</h3>
          {topBonus.length > 0
            ? topBonus.map((data: any) => {
                return innerData(data, data.bonus);
              })
            : null}
        </Box>
      </BoxContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  padding: 2rem;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftData = styled.div`
  display: flex;
`;

const RightData = styled.div`
  display: flex;
`;

const SmallScreenOnly = styled.span`
  @media (min-width: 1078px) {
    display: none;
  }
`;

const LargeScreenOnly = styled.span`
  @media (max-width: 1077px) {
    display: none;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div`
  width: calc(100% / 2 - 20px); // Responsive width for 2 boxes per row
  background-color: #2c3e50; // A more subtle color
  color: #ecf0f1; // A light color for text to enhance readability
  margin: 10px; // Uniform margin for spacing
  padding: 1.5rem; // Increased padding for better spacing
  box-sizing: border-box; // Keeps padding within the box width
  border-radius: 8px; // Rounded corners
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  transition: all 0.3s ease; // Smooth transition for hover effect

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); // Increased shadow on hover
    transform: translateY(-5px); // Slight lift effect on hover
  }

  h3 {
    margin-top: 0;
    color: #f39c12; // A contrasting color for headings
  }

  p {
    line-height: 1.6; // Improved line spacing for readability
    margin: 0.5rem 0; // Spacing between paragraphs
  }

  @media (max-width: 768px) {
    width: 100%; // Full width on smaller screens
  }
`;
