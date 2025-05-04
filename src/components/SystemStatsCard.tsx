
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/providers/StatsProvider";
import { Progress } from "@/components/ui/progress";
import { Cpu, Ram, Battery, Activity } from "lucide-react";

const SystemStatsCard = () => {
  const { stats } = useStats();

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-turbo-blue" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatItem 
          icon={<Ram className="h-4 w-4 text-turbo-purple" />}
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
    <Progress value={progress} className="h-1" className={`h-1 ${colorClass}`} />
  </div>
);

export default SystemStatsCard;
