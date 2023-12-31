import axios from "axios";
import { FPL_PLAYER_URL } from "../common/url";

const positionToNumber = (position: string) => {
  if (position === "forward") return "4";
  else if (position === "midfielder") return "3";
  else if (position === "defender") return "2";
  else if (position === "goalkeeper") return "1";
  else return "0";
};

export const getTopPointers = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    if (!position) {
      return players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.total_points - a.total_points)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopScorers = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    if (!position) {
      return players.sort((a: any, b: any) => b.goals_scored - a.goals_scored).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.goals_scored - a.goals_scored)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

// getTopScorers();

export const getTopAssisters = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    if (!position) {
      return players.sort((a: any, b: any) => b.assists - a.assists).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.assists - a.assists)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopBonusPointers = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.

    if (!position) {
      return players.sort((a: any, b: any) => b.bonus - a.bonus).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.bonus - a.bonus)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopTransfersIn = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.

    if (!position) {
      return players.sort((a: any, b: any) => b.transfers_in_event - a.transfers_in_event).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.transfers_in_event - a.transfers_in_event)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const getTopTransfersOut = async (position?: string) => {
  try {
    const response = await axios.get(FPL_PLAYER_URL);
    // console.log(response.data);
    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;
    // console.log(players.sort((a: any, b: any) => b.total_points - a.total_points).slice(0, 10));
    // 선수 데이터를 응답으로 보냅니다.
    if (!position) {
      return players.sort((a: any, b: any) => b.transfers_out_event - a.transfers_out_event).slice(0, 10);
    } else {
      position = positionToNumber(position);
      return players
        .filter((player: any) => player.element_type === parseInt(position as string))
        .sort((a: any, b: any) => b.transfers_out_event - a.transfers_out_event)
        .slice(0, 10);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};
