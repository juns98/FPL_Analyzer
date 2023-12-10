import axios from "axios";
import { FPL_PLAYER_URL } from "../common/url";

export const getTopPointers = async () => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    return players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopScorers = async () => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    return players.sort((a: any, b: any) => b.goals_scored - a.goals_scored).slice(0, 10);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

// getTopScorers();

export const getTopAssisters = async () => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    return players.sort((a: any, b: any) => b.assists - a.assists).slice(0, 10);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopBonusPointers = async () => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    return players.sort((a: any, b: any) => b.bonus - a.bonus).slice(0, 10);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};
