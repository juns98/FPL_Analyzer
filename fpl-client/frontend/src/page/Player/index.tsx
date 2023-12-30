import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { getTeamNameById } from "../../utils/getTeamNameById";

function Player() {
  const [playerFacts, setPlayerFacts] = useState<Array<string>>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [teamInfo, setTeamInfo] = useState([]);

  const questionLists = [
    "Top Transfer in this Week",
    "Top Transfer out this Week",
    "Get most underpriced Forward",
    "Get most underpriced Midfielder",
    "Get most underpriced Defender",
    "Get most underpriced Goalkeeper",
  ];

  const answerHeaders = [
    ["Name", "Team", "Points", "Transfers In"],
    ["Name", "Team", "Points", "Transfers Out"],
  ];

  const getAnswer = async () => {
    const serverUrl = process.env.REACT_APP_SERVER_ADDRESS;
    const teamInfo = await axios.get(`http://${serverUrl}/team-info`);
    setTeamInfo(teamInfo.data);
    if (questionIndex === 0) {
      const response: any = await axios.get(`http://${serverUrl}/top-players/transfer-in`);
      setAnswers(response.data);
    } else if (questionIndex === 1) {
      const response: any = await axios.get(`http://${serverUrl}/top-players/transfer-out`);
      setAnswers(response.data);
    }
  };

  const getPlayerFacts = async () => {
    const serverUrl = process.env.REACT_APP_SERVER_ADDRESS;
    const response: any = await axios.get(`http://${serverUrl}/facts/players`);
    setPlayerFacts(response.data);
  };

  useEffect(() => {
    getAnswer();
  }, [questionIndex]);

  useEffect(() => {
    getPlayerFacts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1 >= playerFacts.length ? 0 : prevIndex + 1));
    }, 3000); // Change fact every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [playerFacts.length]);

  const answerData = (data: any) => {
    // console.log(data);
    if (questionIndex === 0 || questionIndex === 1) {
      return (
        <AnswerData>
          <AnswerComponent>{data.web_name}</AnswerComponent>
          <AnswerComponent>{getTeamNameById(teamInfo, data.team_code)}</AnswerComponent>
          <AnswerComponent>{data.total_points}</AnswerComponent>
          <AnswerComponent>{questionIndex === 0 ? data.transfers_in_event : data.transfers_out_event}</AnswerComponent>
        </AnswerData>
      );
    }
  };

  return (
    <Container>
      <Navbar />
      <Title>Players</Title>
      <InfoBox>
        {playerFacts.length > 0 && <InfoText key={currentFactIndex}>{playerFacts[currentFactIndex]}</InfoText>}
      </InfoBox>
      <Question>What would you like to know?</Question>
      <QuestionLists>
        {questionLists.map((question, index) => (
          <QuestionList
            key={index}
            onClick={() => {
              setQuestionIndex(index);
              console.log(index);
            }}
          >
            {question}
          </QuestionList>
        ))}
      </QuestionLists>

      <Answer>
        <AnswerHeader>
          {answerHeaders[questionIndex].map((header, index) => (
            <AnswerComponent key={index}>{header}</AnswerComponent>
          ))}
        </AnswerHeader>

        {answers.length > 0 && answers.map((answer: any) => answerData(answer))}
      </Answer>
    </Container>
  );
}

export default Player;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const InfoBox = styled.div`
  background-color: #98fb98;
  color: black;
  padding: 20px;
  margin: 20px auto; // Center the box
  border-radius: 8px; // Softer border radius
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Adds depth with a shadow
  position: relative; // Needed for the tooltip arrow
  max-width: 600px; // Set a max-width for better readability
  text-align: left; // Align text to the left for better readability
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const InfoText = styled.h2`
  color: black;
  animation: ${fadeIn} 1s ease-in-out;
  font-size: 1.1rem; // Slightly larger font for readability
  line-height: 1.4; // Better line spacing
`;

const Question = styled.h2`
  color: #777;
  margin-bottom: 20px;
`;

const QuestionLists = styled.div`
  display: flex;
  overflow-x: auto; // Enable horizontal scrolling
  white-space: nowrap; // Keep items in a single line
  max-width: 600px;
  margin: 20px auto;
  padding-bottom: 20px; // Add padding to avoid cutting off during scroll

  &::-webkit-scrollbar {
    height: 8px; // Custom scrollbar height
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; // Track color
  }

  &::-webkit-scrollbar-thumb {
    background: #888; // Scrollbar color
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; // Scrollbar color on hover
  }
`;

const QuestionList = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  margin: 0 10px; // Spacing between items
  flex: 0 0 auto; // Flex item does not grow or shrink
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: bold;
`;

const Answer = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  margin: 0 10px; // Spacing between items
  flex: 0 0 auto; // Flex item does not grow or shrink
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const AnswerData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const AnswerComponent = styled.div`
  width: 25%;
`;
