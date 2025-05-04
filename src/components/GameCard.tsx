
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Game } from "@/types";
import { useGame } from "@/providers/GameProvider";
import { Zap, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const { optimizeGame, startGameBoost } = useGame();

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <div className="p-4 flex gap-4">
        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={game.icon} 
            alt={`${game.name} icon`} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{game.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className={`w-2 h-2 rounded-full ${game.isOptimized ? 'bg-green-500' : 'bg-gray-500'}`}
            ></div>
            <span className="text-xs text-gray-400">
              {game.isOptimized ? 'Optimized' : 'Not Optimized'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0 flex gap-2 justify-end">
        {game.isOptimized ? (
          <>
            <Button 
              size="sm" 
              variant="outline"
              className="gap-1"
              asChild
            >
              <Link to={`/games/${game.id}`}>
                <Settings size={14} />
                Settings
              </Link>
            </Button>
            <Button 
              size="sm"
              className="bg-turbo-purple hover:bg-turbo-purpleDark gap-1"
              onClick={() => startGameBoost(game.id)}
            >
              <Zap size={14} />
              Boost
            </Button>
          </>
        ) : (
          <Button 
            className="bg-turbo-blue hover:bg-turbo-skyBlue"
            size="sm"
            onClick={() => optimizeGame(game.id)}
          >
            Optimize
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GameCard;
