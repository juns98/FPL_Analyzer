import axios from "axios";

export const getAllPlayers = async () => {
  try {
    const url: string = "localhost:3000/players";
    const response = await axios.get(url);
    console.log(response.data);

    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;

    // 선수 데이터를 응답으로 보냅니다.
    return players;
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};
