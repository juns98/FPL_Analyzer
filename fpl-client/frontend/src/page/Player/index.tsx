import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { getTeamNameById } from "../../utils/getTeamNameById";
import ReactModal from "react-modal";
import Button from "../../components/Button";

ReactModal.setAppElement("#root"); // Assuming your root element has the ID 'root'

function Player() {
  const [playerFacts, setPlayerFacts] = useState<Array<string>>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [teamInfo, setTeamInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Question onClick={() => setIsModalOpen(true)}>What would you like to know?</Question>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles} // Optional: Custom styles
      >
        {questionLists.map((question, index) => (
          <QuestionList
            key={index}
            onClick={() => {
              setQuestionIndex(index);
              setIsModalOpen(false);
            }}
          >
            {question}
          </QuestionList>
        ))}
      </ReactModal>

      <Answer>
        <Target>{questionLists[questionIndex]}</Target>
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "rgba(0,0,0,0)", // transparent
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const InfoBox = styled.div`
  background-color: #98fb98;
  color: black;
  padding: 20px;
  margin: 10px auto; // Center the box
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

const Question = styled(Button)`
  margin-bottom: 20px;
  // add shadow
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
`;

const Target = styled.h2`
  margin-bottom: 20px;
`;

const QuestionList = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  margin: 10px 10px; // Spacing between items
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
  word-wrap: break-word; // Allows long words to be able to be broken and wrap onto the next line
  overflow-wrap: break-word; // Ensure long words break and wrap to the next line
  white-space: normal; // Allow wrapping of text in case of long strings without spaces
`;
