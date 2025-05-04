import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShizukuSetup from "@/components/ShizukuSetup";
import { RamBoostCard } from "@/components/PerformanceCard";
import SystemStatsCard from "@/components/SystemStatsCard";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import { useShizuku } from "@/providers/ShizukuProvider";
import { useGame } from "@/providers/GameProvider";
import { useFloatingToolbox } from "@/providers/FloatingToolboxProvider";
import { Link } from "react-router-dom";
import { Gamepad, Cpu, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const { isShizukuGranted } = useShizuku();
  const { games } = useGame();
  const { showToolbox } = useFloatingToolbox();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Check if this is the first visit
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("turboboost_onboarding_complete");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  
  const handleOnboardingComplete = () => {
    localStorage.setItem("turboboost_onboarding_complete", "true");
    setShowOnboarding(false);
  };
  
  const optimizedGames = games.filter(game => game.isOptimized).length;

  return (
    <Layout>
      {showOnboarding && <OnboardingTutorial onComplete={handleOnboardingComplete} />}
      
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">TurboBoost</h1>
          <p className="text-gray-400">Advanced game optimization without root access</p>
        </header>

        {!isShizukuGranted && (
          <div className="mb-8">
            <ShizukuSetup />
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Gamepad className="h-5 w-5 text-turbo-purple" />
              Game Library
            </h2>
            
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{games.length}</p>
                    <p className="text-sm text-gray-400">Games detected</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-turbo-purple">{optimizedGames}</p>
                    <p className="text-sm text-gray-400">Optimized</p>
                  </div>
                  <Button 
                    className="bg-turbo-blue hover:bg-turbo-skyBlue"
                    size="sm"
                    asChild
                  >
                    <Link to="/games">View All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-turbo-purple" />
                Performance
              </h2>
              <RamBoostCard />
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-turbo-purple" />
                System Status
              </h2>
              <SystemStatsCard />
            </div>
          </div>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle>Floating Toolbox</CardTitle>
              <CardDescription>
                Access quick tools while gaming
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-turbo-purple hover:bg-turbo-purpleDark" 
                onClick={showToolbox}
              >
                Show Floating Toolbox
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
