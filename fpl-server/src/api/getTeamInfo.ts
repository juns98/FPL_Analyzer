import axios from "axios";
import { FPL_TEAM_URL, FOOTBALL_DATA_LEAGUE_TABLE_URL } from "../common/url";
import dotenv from "dotenv";
dotenv.config();

export const getTeamInfo = async () => {
  try {
    const url: string = FPL_TEAM_URL;
    const response = await axios.get(url);
    // console.log(response.data.teams);

    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const team = response.data.teams;

    // 감독 데이터를 응답으로 보냅니다.
    return team;
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

export const fetchTeamStanding = async () => {
  try {
    const url: string = FOOTBALL_DATA_LEAGUE_TABLE_URL;
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    });
    // console.log(response.data.standings[0].table);

    return response;
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

// fetch team standing regularly
let table: any = [];
fetchTeamStanding().then((res) => {
  table = res.data.standings[0].table;
});
setInterval(() => {
  fetchTeamStanding().then((res) => {
    table = res.data.standings[0].table;
  });
}, 1000 * 60 * 5); // 5분마다

export const getTeamStanding = async () => {
  try {
    // console.log(table);
    return table;
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};

// getTeamStanding();
