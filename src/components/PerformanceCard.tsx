
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGame } from "@/providers/GameProvider";
import { useShizuku } from "@/providers/ShizukuProvider";
import { Zap, AlertCircle } from "lucide-react";

interface PerformanceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  requiresShizuku?: boolean;
  onAction: () => void;
}

const PerformanceCard = ({ title, description, icon, actionLabel, requiresShizuku = true, onAction }: PerformanceCardProps) => {
  const { isShizukuGranted } = useShizuku();

  const handleClick = () => {
    if (!requiresShizuku || (requiresShizuku && isShizukuGranted)) {
      onAction();
    }
  };
  
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400">{description}</p>
        
        {requiresShizuku && !isShizukuGranted ? (
          <div className="flex items-center gap-2 rounded-md bg-amber-900/30 p-2 border border-amber-800/50">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <p className="text-xs text-amber-300">Requires Shizuku permission</p>
          </div>
        ) : null}
        
        <Button 
          className="w-full gap-2 bg-turbo-purple hover:bg-turbo-purpleDark"
          disabled={requiresShizuku && !isShizukuGranted}
          onClick={handleClick}
        >
          <Zap className="h-4 w-4" />
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

const RamBoostCard = () => {
  const { performRamBoost } = useGame();
  
  return (
    <PerformanceCard
      title="RAM Boost"
      description="Clear background processes and free up memory for better game performance."
      icon={<Zap className="h-5 w-5 text-turbo-purple" />}
      actionLabel="Boost RAM"
      onAction={performRamBoost}
    />
  );
};

export { PerformanceCard, RamBoostCard };
