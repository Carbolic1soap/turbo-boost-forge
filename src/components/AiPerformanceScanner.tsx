
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Sparkles, AlertCircle } from "lucide-react";
import { useShizuku } from "@/providers/ShizukuProvider";
import { useToast } from "@/components/ui/use-toast";

interface ScanResult {
  cpuOptimization: string;
  ramOptimization: string;
  thermalOptimization: string;
  graphicsOptimization: string;
  batteryOptimization: string;
}

const AiPerformanceScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult | null>(null);
  const { isShizukuGranted } = useShizuku();
  const { toast } = useToast();

  const startScan = async () => {
    if (!isShizukuGranted) {
      toast({
        variant: "destructive",
        title: "Permission Required",
        description: "Shizuku permission is needed for system scanning",
      });
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate scan completion
    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      setScanProgress(100);
      
      // Simulate AI recommendations
      setScanResults({
        cpuOptimization: "CPU governor set to performance mode",
        ramOptimization: "Optimized memory allocation and compressed RAM",
        thermalOptimization: "Adjusted thermal throttling thresholds",
        graphicsOptimization: "Vulkan API recommended for your GPU",
        batteryOptimization: "Balanced power profile applied",
      });
      
      toast({
        title: "AI Scan Complete",
        description: "Performance optimizations ready to apply",
      });
    }, 5000);
  };

  const applyOptimizations = () => {
    toast({
      title: "Optimizations Applied",
      description: "Temporary system changes made for maximum performance",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-turbo-purple" />
          AI Performance Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400">
          Scan your device using AI to detect optimal settings for maximum gaming performance
        </p>

        {!isScanning && scanProgress === 0 && (
          <Button 
            className="w-full gap-2 bg-turbo-purple hover:bg-turbo-purpleDark"
            disabled={!isShizukuGranted}
            onClick={startScan}
          >
            <Sparkles className="h-4 w-4" />
            Start AI Scan
          </Button>
        )}

        {(isScanning || scanProgress > 0) && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Scanning system...</span>
              <span>{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2 bg-gray-700" />
          </div>
        )}

        {scanResults && (
          <div className="space-y-4 pt-2">
            <div className="rounded-md bg-green-900/20 p-3 border border-green-800/40">
              <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-400" />
                AI Recommendations
              </h3>
              <ul className="space-y-2 text-xs">
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{scanResults.cpuOptimization}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{scanResults.ramOptimization}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{scanResults.thermalOptimization}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{scanResults.graphicsOptimization}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{scanResults.batteryOptimization}</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-2 items-center rounded-md bg-amber-900/30 p-2 border border-amber-800/50">
              <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-300">
                Changes are temporary and will be reverted on device restart
              </p>
            </div>
            
            <Button 
              className="w-full gap-2 bg-turbo-blue hover:bg-turbo-skyBlue"
              onClick={applyOptimizations}
            >
              Apply Optimizations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiPerformanceScanner;
