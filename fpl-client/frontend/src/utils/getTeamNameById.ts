export const getTeamNameById = (teams: any, id: number) => {
  const team = teams.find((team: any) => team.code === id);
  return team.name;
};
