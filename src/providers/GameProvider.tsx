
import React, { createContext, useState, useContext, useEffect } from "react";
import { Game, GameSettings } from "@/types";
import { mockGames } from "@/data/mockData";
import { useShizuku } from "./ShizukuProvider";
import { useToast } from "@/components/ui/use-toast";

interface GameContextType {
  games: Game[];
  activeGame: Game | null;
  isGameRunning: boolean;
  optimizeGame: (gameId: string) => void;
  updateGameSettings: (gameId: string, settings: Partial<GameSettings>) => void;
  startGameBoost: (gameId: string) => void;
  stopGameBoost: () => void;
  performRamBoost: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const { isShizukuGranted } = useShizuku();
  const { toast } = useToast();

  const optimizeGame = (gameId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            isOptimized: true,
            customSettings: {
              dndMode: true,
              performanceMode: true,
              ramBoost: true,
              networkOptimize: false,
            },
          };
        }
        return game;
      })
    );

    toast({
      title: "Game Optimized",
      description: "Custom optimization settings have been applied",
    });
  };

  const updateGameSettings = (
    gameId: string,
    settings: Partial<GameSettings>
  ) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            customSettings: {
              ...game.customSettings,
              ...settings,
            },
          };
        }
        return game;
      })
    );
  };

  const startGameBoost = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setActiveGame(game);
      setIsGameRunning(true);

      if (isShizukuGranted && game.customSettings) {
        // Apply game specific optimizations
        console.log("Applying optimizations for:", game.name);
        
        if (game.customSettings.dndMode) {
          console.log("DND Mode activated");
          // Would use Shizuku to toggle DND mode
        }
        
        if (game.customSettings.performanceMode) {
          console.log("Performance Mode activated");
          // Would use Shizuku to boost CPU/GPU
        }
        
        if (game.customSettings.ramBoost) {
          performRamBoost();
        }
        
        if (game.customSettings.networkOptimize) {
          console.log("Network optimizer activated");
          // Would use Shizuku for network optimization
        }
      }

      toast({
        title: `Boosting ${game.name}`,
        description: "Game performance optimizations applied",
      });
    }
  };

  const stopGameBoost = () => {
    if (activeGame && isShizukuGranted) {
      console.log("Stopping boost for:", activeGame.name);
      // Restore normal settings
    }
    
    setActiveGame(null);
    setIsGameRunning(false);
  };

  const performRamBoost = () => {
    if (isShizukuGranted) {
      console.log("Performing RAM boost");
      // Would use Shizuku to clean RAM
      
      toast({
        title: "RAM Boost",
        description: "Background processes cleared for optimal performance",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Permission Required",
        description: "Shizuku permission is needed for RAM boost",
      });
    }
  };

  useEffect(() => {
    // In a real app, we would detect installed games here
    console.log("Detecting installed games");
  }, []);

  return (
    <GameContext.Provider
      value={{
        games,
        activeGame,
        isGameRunning,
        optimizeGame,
        updateGameSettings,
        startGameBoost,
        stopGameBoost,
        performRamBoost,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
