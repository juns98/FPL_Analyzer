import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import axios from "axios";

function Home() {
  const [topPointer, setTopPointer] = useState([]);
  const [topScorer, setTopScorer] = useState([]);
  const [topAssister, setTopAssister] = useState([]);
  const [topBonus, setTopBonus] = useState([]);

  const getTopData = async () => {
    const pointers = await axios.get("http://localhost:4000/top-pointers");
    const scorers = await axios.get("http://localhost:4000/top-scorers");
    const assisters = await axios.get("http://localhost:4000/top-assisters");
    const bonus = await axios.get("http://localhost:4000/top-bonus-pointers");
    console.log(pointers.data);
    setTopPointer(pointers.data);
    setTopScorer(scorers.data);
    setTopAssister(assisters.data);
    setTopBonus(bonus.data);
  };
  useEffect(() => {
    getTopData();
  }, []);
  return (
    <Container>
      <Navbar />
      <h1>Welcome to the FPL Helper</h1>
      <p>Hello People</p>

      <BoxContainer>
        <Box>
          <h3>Top Pointers</h3>
          {topPointer.length > 0
            ? topPointer.map((data: any) => {
                return (
                  <p>
                    {data.first_name} {data.second_name} ({data.team_code}) - {data.total_points}
                  </p>
                );
              })
            : null}
        </Box>
        <Box>
          <h3>Top Scorer</h3>
          {topScorer.length > 0
            ? topScorer.map((data: any) => {
                return (
                  <p>
                    {data.first_name} {data.second_name} ({data.team_code}) - {data.goals_scored}
                  </p>
                );
              })
            : null}
        </Box>
        <Box>
          <h3>Top Assister</h3>
          {topAssister.length > 0
            ? topAssister.map((data: any) => {
                return (
                  <p>
                    {data.first_name} {data.second_name} ({data.team_code}) - {data.assists}
                  </p>
                );
              })
            : null}
        </Box>
        <Box>
          <h3>Top Bonus</h3>
          {topBonus.length > 0
            ? topBonus.map((data: any) => {
                return (
                  <p>
                    {data.first_name} {data.second_name} ({data.team_code}) - {data.bonus}
                  </p>
                );
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

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div`
  width: auto;
  background-color: #333;
  color: white;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;
