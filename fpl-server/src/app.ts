import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

import { FPL_PLAYER_URL } from "./common/url";
import { getAllPlayers } from "./api/getAllPlayers";
import { getManager } from "./api/getManager";
import { getTopAssisters, getTopPointers, getTopScorers } from "./api/getTopPlayers";

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin to access your API
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true, // Enable cookies
  })
);

app.get("/", (req, res) => {
  res.send("FPL Server");
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

// ====== Top Players ====== //
app.get("/top-pointers", async (req: Request, res: Response) => {
  try {
    const players = await getTopPointers();
    console.log(players);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(players);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get("/top-scorers", async (req: Request, res: Response) => {
  try {
    const players = await getTopScorers();
    console.log(players);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(players);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get("/top-assisters", async (req: Request, res: Response) => {
  try {
    const players = await getTopAssisters();
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
    const manager = await getManager(3504103);
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
