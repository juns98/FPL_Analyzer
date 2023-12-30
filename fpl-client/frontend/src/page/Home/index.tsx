import React, { useEffect, useState, ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { getTeamNameById } from "../../utils/getTeamNameById";
import Button from "../../components/Button";
import colors from "../../assets/colors/colors";

interface PositionButtonProps {
  selected: boolean;
}
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PositionButtonProps {}

function Home() {
  const [topPointer, setTopPointer] = useState([]);
  const [topScorer, setTopScorer] = useState([]);
  const [topAssister, setTopAssister] = useState([]);
  const [topBonus, setTopBonus] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);
  const [position, setPosition] = useState("" as string);

  const getTopData = async () => {
    const serverUrl = process.env.REACT_APP_SERVER_ADDRESS;
    const pointers = await axios.get(`http://${serverUrl}/top-players/pointers`, {
      params: {
        position: position,
      },
    });
    const scorers = await axios.get(`http://${serverUrl}/top-players/scorers`, {
      params: {
        position: position,
      },
    });
    const assisters = await axios.get(`http://${serverUrl}/top-players/assisters`, {
      params: {
        position: position,
      },
    });
    const bonus = await axios.get(`http://${serverUrl}/top-players/bonus-pointers`, {
      params: {
        position: position,
      },
    });
    const teamInfo = await axios.get(`http://${serverUrl}/team-info`);

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
  }, [position]);

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
      <ButtonContainer>
        <PositionButton
          selected={position === ""}
          onClick={() => {
            setPosition("");
          }}
        >
          All
        </PositionButton>
        <PositionButton
          selected={position === "forward"}
          onClick={() => {
            setPosition("forward");
          }}
          data-short-name="FWD" // Short name
        >
          <span>Forward</span>
        </PositionButton>
        <PositionButton
          selected={position === "midfielder"}
          onClick={() => {
            setPosition("midfielder");
          }}
          data-short-name="MID" // Short name
        >
          <span>Midfielder</span>
        </PositionButton>
        <PositionButton
          selected={position === "defender"}
          onClick={() => {
            setPosition("defender");
          }}
          data-short-name="DEF" // Short name
        >
          <span>Defender</span>
        </PositionButton>
        <PositionButton
          selected={position === "goalkeeper"}
          onClick={() => {
            setPosition("goalkeeper");
          }}
          data-short-name="GK" // Short name
        >
          <span>GoalKeeper</span>
        </PositionButton>
      </ButtonContainer>
      <BoxContainer>
        <Box>
          <h3>Most Points</h3>
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
          <h3>Most Assists</h3>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const PositionButton = styled(Button)<CustomButtonProps>`
  background-color: ${(props) => (props.selected ? colors.buttonHover : colors.primary)};
  text-align: center;
  width: 18%;

  // Add media query for small screens
  @media (max-width: 1078px) {
    font-size: 0.8;
    padding: 5px 10px;

    // Using a pseudo-element to display the short name
    &:after {
      content: attr(data-short-name); // Use the short name as content
      display: block;
    }

    // Hide the original text
    > span {
      display: none;
    }
  }
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
  background-color: ${colors.primary}; // A more subtle color: ;
  color: ${colors.boxText}; // A light color for text to enhance readability
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
    color: ${colors.secondary}; // A contrasting color for headings
  }

  p {
    line-height: 1.6; // Improved line spacing for readability
    margin: 0.5rem 0; // Spacing between paragraphs
  }

  @media (max-width: 768px) {
    width: 100%; // Full width on smaller screens
  }
`;
