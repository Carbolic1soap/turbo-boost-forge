
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useShizuku } from "@/providers/ShizukuProvider";
import { AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

const ShizukuSetup = () => {
  const { isShizukuAvailable, isShizukuGranted, requestShizukuPermission } = useShizuku();

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="text-gradient">Shizuku Setup</span>
        </CardTitle>
        <CardDescription>
          TurboBoost requires Shizuku to perform system-level optimizations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <StatusItem 
            title="Shizuku Available"
            description="Checking if Shizuku is installed on your device"
            status={isShizukuAvailable ? "success" : "warning"}
            message={isShizukuAvailable ? 
              "Shizuku is installed" : 
              "Please install Shizuku from Google Play Store"
            }
          />
          
          <StatusItem 
            title="Shizuku Permission"
            description="Checking if TurboBoost has permission to use Shizuku"
            status={isShizukuGranted ? "success" : isShizukuAvailable ? "warning" : "disabled"}
            message={isShizukuGranted ? 
              "Permission granted" : 
              isShizukuAvailable ? "Permission required" : "Install Shizuku first"
            }
          />
        </div>

        {!isShizukuAvailable && (
          <Button className="w-full gap-2" onClick={() => window.open("https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api")}>
            <ExternalLink className="h-4 w-4" />
            Install Shizuku
          </Button>
        )}
        
        {isShizukuAvailable && !isShizukuGranted && (
          <Button 
            className="w-full bg-turbo-purple hover:bg-turbo-purpleDark"
            onClick={requestShizukuPermission}
          >
            Request Permission
          </Button>
        )}
        
        {isShizukuAvailable && isShizukuGranted && (
          <div className="bg-green-900/20 border border-green-800/40 rounded-md p-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-300">Shizuku is set up and ready to use</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatusItemProps {
  title: string;
  description: string;
  status: "success" | "warning" | "disabled";
  message: string;
}

const StatusItem = ({ title, description, status, message }: StatusItemProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "disabled":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusClass = () => {
    switch (status) {
      case "success":
        return "text-green-300";
      case "warning":
        return "text-amber-300";
      case "disabled":
        return "text-gray-500";
    }
  };
  
  return (
    <div className="flex gap-3">
      <div className="mt-1">
        {getStatusIcon()}
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
        <p className={`text-xs font-medium mt-1 ${getStatusClass()}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ShizukuSetup;
