import express, { Request, Response } from "express";
import axios from "axios";

import { FPL_BASE_URL } from "./common/url";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/players", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(FPL_BASE_URL);

    // 'elements' 필드에 선수 데이터가 포함되어 있습니다.
    const players = response.data.elements;

    // 선수 데이터를 응답으로 보냅니다.
    res.json(players);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
