
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/providers/StatsProvider";
import { Progress } from "@/components/ui/progress";
import { Cpu, MemoryStick, Battery, Activity, Palette, Smartphone } from "lucide-react";
import { useShizuku } from "@/providers/ShizukuProvider";

const SystemStatsCard = () => {
  const { stats } = useStats();
  const { graphicsApi } = useShizuku();

  const formatGraphicsApi = () => {
    if (graphicsApi === "auto") return "Auto";
    return graphicsApi.toUpperCase();
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-turbo-blue" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-gray-800/50 p-3 border border-gray-700/40 mb-4">
          <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-turbo-blue" />
            Active Device
          </h3>
          <div className="text-xs text-center">
            <p className="text-turbo-blue font-medium">Google Pixel 7 Pro</p>
            <p className="text-gray-400 mt-1">Android 14 • Tensor G2 • Mali-G710</p>
          </div>
        </div>

        <StatItem 
          icon={<MemoryStick className="h-4 w-4 text-turbo-purple" />}
          label="RAM Usage" 
          value={`${Math.round(stats.ramUsage)}%`}
          progress={stats.ramUsage}
          colorClass="bg-turbo-purple"
        />
        
        <StatItem 
          icon={<Cpu className="h-4 w-4 text-orange-500" />}
          label="CPU Temp" 
          value={`${Math.round(stats.cpuTemp)}°C`}
          progress={(stats.cpuTemp / 100) * 100}
          colorClass={stats.cpuTemp > 55 ? "bg-red-500" : "bg-orange-500"}
        />
        
        <StatItem 
          icon={<Activity className="h-4 w-4 text-turbo-blue" />}
          label="Current FPS" 
          value={`${stats.fps}`}
          progress={(stats.fps / 60) * 100}
          colorClass="bg-turbo-blue"
        />
        
        <StatItem 
          icon={<Battery className="h-4 w-4 text-green-500" />}
          label="Battery" 
          value={`${Math.round(stats.batteryLevel)}%`}
          progress={stats.batteryLevel}
          colorClass={stats.batteryLevel < 20 ? "bg-red-500" : "bg-green-500"}
        />

        <StatItem 
          icon={<Palette className="h-4 w-4 text-cyan-400" />}
          label="Graphics API" 
          value={formatGraphicsApi()}
          progress={100}
          colorClass="bg-cyan-400"
        />
      </CardContent>
    </Card>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress: number;
  colorClass: string;
}

const StatItem = ({ icon, label, value, progress, colorClass }: StatItemProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <Progress value={progress} className={`h-1 ${colorClass}`} />
  </div>
);

export default SystemStatsCard;
