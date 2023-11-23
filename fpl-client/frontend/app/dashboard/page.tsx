async function getData() {
  const res = await fetch("http://localhost:3000/players");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function DashBoard() {
  const data = await getData();
  console.log(data[0].first_name);
  return (
    <div>
      <h1>Dashboard</h1>
      {data.map((player: any) => (
        <li key={player.id}>
          {player.first_name} {player.second_name} {player.team}
        </li>
      ))}
    </div>
  );
}
