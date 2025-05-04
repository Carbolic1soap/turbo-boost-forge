
import Layout from "@/components/Layout";
import { PerformanceCard, RamBoostCard } from "@/components/PerformanceCard";
import GraphicsApiSelector from "@/components/GraphicsApiSelector";
import AiPerformanceScanner from "@/components/AiPerformanceScanner";
import { Cpu, Activity, Wifi, Moon } from "lucide-react";
import { useGame } from "@/providers/GameProvider";
import { useToast } from "@/components/ui/use-toast";
import { useShizuku } from "@/providers/ShizukuProvider";

const Performance = () => {
  const { toast } = useToast();
  const { graphicsApi, setGraphicsApi } = useShizuku();
  
  const handlePerformanceMode = () => {
    toast({
      title: "Performance Mode Activated",
      description: "CPU and GPU optimized for gaming"
    });
  };
  
  const handleNetworkOptimize = () => {
    toast({
      title: "Network Optimized",
      description: "Using optimized DNS settings"
    });
  };
  
  const handleDndMode = () => {
    toast({
      title: "DND Mode Activated",
      description: "Notifications silenced during gameplay"
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Cpu className="h-6 w-6 text-turbo-purple" />
            Performance Optimization
          </h1>
          <p className="text-gray-400">Boost your gaming experience</p>
        </header>

        <div className="space-y-6">
          <AiPerformanceScanner />
          
          <GraphicsApiSelector 
            selectedApi={graphicsApi}
            onApiChange={setGraphicsApi}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RamBoostCard />
            
            <PerformanceCard
              title="Performance Mode"
              description="Boost CPU and GPU by prioritizing game processes for maximum performance."
              icon={<Activity className="h-5 w-5 text-turbo-blue" />}
              actionLabel="Activate Performance Mode"
              onAction={handlePerformanceMode}
            />
            
            <PerformanceCard
              title="Network Optimizer"
              description="Optimize network settings for lower latency during online gameplay."
              icon={<Wifi className="h-5 w-5 text-turbo-skyBlue" />}
              actionLabel="Optimize Network"
              onAction={handleNetworkOptimize}
            />
            
            <PerformanceCard
              title="DND Mode"
              description="Block notifications and calls while gaming for uninterrupted gameplay."
              icon={<Moon className="h-5 w-5 text-turbo-purpleDark" />}
              actionLabel="Enable DND Mode"
              onAction={handleDndMode}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Performance;
