import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "@/providers/GameProvider";
import { useToast } from "@/components/ui/use-toast";
import { Gamepad, ChevronLeft, Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { GameSettings } from "@/types";

const GameDetail = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { games, updateGameSettings, startGameBoost } = useGame();
  const { toast } = useToast();
  
  const game = games.find(g => g.id === gameId);
  const [settings, setSettings] = useState<GameSettings>({
    dndMode: true,
    performanceMode: true,
    ramBoost: true,
    networkOptimize: false,
  });
  
  useEffect(() => {
    if (game && game.customSettings) {
      setSettings(game.customSettings);
    }
  }, [game]);
  
  if (!game) {
    return (
      <Layout>
        <div className="container pt-8 px-4 text-center">
          <p>Game not found</p>
          <Button variant="link" onClick={() => navigate('/games')}>Back to Games</Button>
        </div>
      </Layout>
    );
  }
  
  const handleSaveSettings = () => {
    updateGameSettings(game.id, settings);
    toast({
      title: "Settings Saved",
      description: `Optimization settings for ${game.name} have been updated`,
    });
  };
  
  const handleToggle = (key: keyof GameSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0" 
          onClick={() => navigate('/games')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Button>
        
        <header className="mb-8 flex items-center gap-4">
          <div className="h-16 w-16 rounded-md overflow-hidden">
            <img 
              src={game.icon} 
              alt={`${game.name} icon`} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{game.name}</h1>
            <p className="text-gray-400">{game.packageName}</p>
          </div>
        </header>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Gamepad className="h-5 w-5 text-turbo-purple" />
                Game Optimization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dnd-mode" className="block font-medium">DND Mode</Label>
                  <p className="text-xs text-gray-400 mt-1">Block notifications during gameplay</p>
                </div>
                <Switch 
                  id="dnd-mode" 
                  checked={settings.dndMode}
                  onCheckedChange={() => handleToggle('dndMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="performance-mode" className="block font-medium">Performance Mode</Label>
                  <p className="text-xs text-gray-400 mt-1">Boost CPU and GPU for this game</p>
                </div>
                <Switch 
                  id="performance-mode" 
                  checked={settings.performanceMode}
                  onCheckedChange={() => handleToggle('performanceMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ram-boost" className="block font-medium">RAM Boost</Label>
                  <p className="text-xs text-gray-400 mt-1">Clear memory when launching the game</p>
                </div>
                <Switch 
                  id="ram-boost" 
                  checked={settings.ramBoost}
                  onCheckedChange={() => handleToggle('ramBoost')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="network-optimize" className="block font-medium">Network Optimization</Label>
                  <p className="text-xs text-gray-400 mt-1">Optimize network settings for lower ping</p>
                </div>
                <Switch 
                  id="network-optimize" 
                  checked={settings.networkOptimize}
                  onCheckedChange={() => handleToggle('networkOptimize')}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button 
              className="flex-1 gap-2 bg-turbo-purple hover:bg-turbo-purpleDark"
              onClick={handleSaveSettings}
            >
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
            <Button 
              className="flex-1 gap-2 bg-turbo-blue hover:bg-turbo-skyBlue"
              onClick={() => {
                startGameBoost(game.id);
                toast({
                  title: "Game Boost Activated",
                  description: `${game.name} has been optimized for gameplay`,
                });
              }}
            >
              <Gamepad className="h-4 w-4" />
              Launch & Boost
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameDetail;
