
import { useGame } from "@/providers/GameProvider";
import GameCard from "./GameCard";

const GameList = () => {
  const { games } = useGame();

  return (
    <div className="space-y-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;
