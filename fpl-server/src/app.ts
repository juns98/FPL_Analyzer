import express, { Request, Response } from "express";
import axios from "axios";

import { FPL_PLAYER_URL } from "./common/url";
import { getAllPlayers } from "./api/getAllPlayers";
import { getManager } from "./api/getManager";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/players", async (req: Request, res: Response) => {
  try {
    const players = await getAllPlayers();
    console.log(players);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(players);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/manager", async (req: Request, res: Response) => {
  try {
    const manager = await getManager(1);
    console.log(manager);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(manager);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
