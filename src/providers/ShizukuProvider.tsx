
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { GraphicsApi } from "@/components/GraphicsApiSelector";

interface ShizukuContextType {
  isShizukuAvailable: boolean;
  isShizukuGranted: boolean;
  graphicsApi: GraphicsApi;
  checkShizukuPermission: () => Promise<boolean>;
  requestShizukuPermission: () => Promise<boolean>;
  setGraphicsApi: (api: GraphicsApi) => void;
}

const ShizukuContext = createContext<ShizukuContextType | undefined>(undefined);

export const ShizukuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShizukuAvailable, setIsShizukuAvailable] = useState(false);
  const [isShizukuGranted, setIsShizukuGranted] = useState(false);
  const [graphicsApi, setGraphicsApi] = useState<GraphicsApi>("auto");
  const { toast } = useToast();

  // In a real app, we would actually check for Shizuku
  // This is a mock implementation for the web preview
  const checkShizukuPermission = async (): Promise<boolean> => {
    console.log("Checking Shizuku permission");
    // For demo purposes, we'll simulate that Shizuku is available but not granted
    setIsShizukuAvailable(true);
    setIsShizukuGranted(false);
    return false;
  };

  const requestShizukuPermission = async (): Promise<boolean> => {
    console.log("Requesting Shizuku permission");
    // Simulate requesting permission
    setTimeout(() => {
      setIsShizukuGranted(true);
      toast({
        title: "Shizuku Permission Granted",
        description: "TurboBoost now has system-level access",
      });
    }, 1500);
    return true;
  };

  const handleSetGraphicsApi = (api: GraphicsApi) => {
    setGraphicsApi(api);
    console.log(`Graphics API set to: ${api}`);
    
    if (isShizukuGranted) {
      toast({
        title: "Graphics API Changed",
        description: `Display rendering changed to ${api === 'auto' ? 'Auto' : api.toUpperCase()}`,
      });
    }
  };

  useEffect(() => {
    // Check for Shizuku when the app loads
    checkShizukuPermission();
  }, []);

  return (
    <ShizukuContext.Provider
      value={{
        isShizukuAvailable,
        isShizukuGranted,
        graphicsApi,
        checkShizukuPermission,
        requestShizukuPermission,
        setGraphicsApi: handleSetGraphicsApi,
      }}
    >
      {children}
    </ShizukuContext.Provider>
  );
};

export const useShizuku = () => {
  const context = useContext(ShizukuContext);
  if (context === undefined) {
    throw new Error("useShizuku must be used within a ShizukuProvider");
  }
  return context;
};
