import axios from "axios";
import { FPL_MANAGER_URL } from "../common/url";

export const getManager = async (eventId: number) => {
  try {
    const url: string = FPL_MANAGER_URL + eventId;
    const response = await axios.get(url);
    console.log(response.data);

    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const manager = response.data;

    // 감독 데이터를 응답으로 보냅니다.
    return manager;
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    throw error;
  }
};
