import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

interface Manager {
  name: string;
  player_first_name: string;
  player_last_name: string;
  player_region_name: string;
  summary_event_rank: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_overall_points: number;
  // Add other manager properties as needed
}

function Manager() {
  const [managerId, setManagerId] = useState<number>(0);
  const [manager, setManager] = useState<Manager | null>(null);

  const getManagerData = async () => {
    if (!managerId) return;
    const serverUrl = process.env.REACT_APP_SERVER_ADDRESS;
    const response: any = await axios.get(`http://${serverUrl}/manager/${managerId}`);
    setManager(response.data);
  };

  useEffect(() => {
    getManagerData();
  }, []);

  return (
    <Container>
      <Navbar />
      <Title>Manager</Title>
      <Subtitle>
        Enter Manager Id:
        <input type="number" onChange={(e) => setManagerId(parseFloat(e.target.value))} />
        <Button label="Submit" onClick={getManagerData} />
      </Subtitle>
      <ManagerCard>
        <ManagerDetail>Manager Name: {manager ? manager.name : "null"}</ManagerDetail>
        <ManagerDetail>Player First Name: {manager ? manager.player_first_name : "null"}</ManagerDetail>
        <ManagerDetail>Player Last Name: {manager ? manager.player_last_name : "null"}</ManagerDetail>
        <ManagerDetail>Player Region Name: {manager ? manager.player_region_name : "null"}</ManagerDetail>
        <ManagerDetail>Summary Event Rank: {manager ? manager.summary_event_rank : "null"}</ManagerDetail>
        <ManagerDetail>Summary Overall Rank: {manager ? manager.summary_overall_rank : "null"}</ManagerDetail>
        <ManagerDetail>Summary Event Points: {manager ? manager.summary_event_points : "null"}</ManagerDetail>
        <ManagerDetail>Summary Overall Points: {manager ? manager.summary_overall_points : "null"}</ManagerDetail>
      </ManagerCard>
    </Container>
  );
}

export default Manager;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Subtitle = styled.h2`
  color: #777;
  margin-bottom: 20px;
`;

const ManagerCard = styled.div`
  background-color: white;
  padding: 20px;
  margin: auto;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const ManagerDetail = styled.h3`
  color: #444;
  text-align: left;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
`;
