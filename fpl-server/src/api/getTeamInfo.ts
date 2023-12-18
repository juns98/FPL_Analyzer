import axios from "axios";
import { FPL_TEAM_URL } from "../common/url";

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

getTeamInfo();
