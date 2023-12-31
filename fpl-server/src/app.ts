import express, { Request, Response } from "express";
import cors from "cors";

import { FPL_PLAYER_URL } from "./common/url";
import { getAllPlayers } from "./api/getAllPlayers";
import { getManager } from "./api/getManager";
import {
  getTopAssisters,
  getTopBonusPointers,
  getTopPointers,
  getTopScorers,
  getTopTransfersIn,
  getTopTransfersOut,
} from "./api/getTopPlayers";
import { getTeamInfo, getTeamStanding } from "./api/getTeamInfo";
import { getFactsPlayer, getFactsTeam } from "./api/getFunFacts";

const app = express();

const port = 4000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://34.82.88.75:3000"], // Allow only this origin to access your API
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
app.get("/top-players/:option", async (req: Request, res: Response) => {
  try {
    const option: string = req.params.option;
    const position: string | undefined = req.query.position?.toString();
    let players;
    if (option === "pointers") {
      if (!position) {
        players = await getTopPointers();
      } else {
        players = await getTopPointers(position);
      }
    } else if (option === "scorers") {
      if (!position) {
        players = await getTopScorers();
      } else {
        players = await getTopScorers(position);
      }
    } else if (option === "assisters") {
      if (!position) {
        players = await getTopAssisters();
      } else {
        players = await getTopAssisters(position);
      }
    } else if (option === "bonus-pointers") {
      if (!position) {
        players = await getTopBonusPointers();
      } else {
        players = await getTopBonusPointers(position);
      }
    } else if (option === "transfer-in") {
      if (!position) {
        players = await getTopTransfersIn();
      } else {
        players = await getTopTransfersIn(position);
      }
    } else if (option === "transfer-out") {
      if (!position) {
        players = await getTopTransfersOut();
      } else {
        players = await getTopTransfersOut(position);
      }
    }
    return res.json(players);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

// ====== Team Info ====== //
app.get("/team-info", async (req: Request, res: Response) => {
  try {
    const teams = await getTeamInfo();
    // console.log(teams);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(teams);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});
app.get("/team-standing", async (req: Request, res: Response) => {
  try {
    const teams = await getTeamStanding();
    // console.log(teams);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(teams);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

// ====== Manager Info ====== //
app.get("/manager/:id", async (req: Request, res: Response) => {
  try {
    const managerId: number = parseFloat(req.params.id);
    const manager = await getManager(managerId);
    console.log(manager);
    // 선수 데이터를 응답으로 보냅니다.
    res.json(manager);
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

// ====== FunFacts ====== //
app.get("/facts/:type", async (req: Request, res: Response) => {
  try {
    const type: string = req.params.type;
    if (type === "players") {
      const playerFacts = await getFactsPlayer();
      return res.json(playerFacts);
    } else if (type === "teams") {
      const teamFacts = await getFactsTeam();
      return res.json(teamFacts);
    }
  } catch (error) {
    console.error("Error fetching data from FPL:", error);
    res.status(500).send("Error fetching data");
  }
});

// ====== App Listen ====== //
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
