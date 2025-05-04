
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useShizuku } from "@/providers/ShizukuProvider";
import ShizukuSetup from "@/components/ShizukuSetup";
import { useToast } from "@/components/ui/use-toast";
import { Settings as SettingsIcon, Info, Shield, BatteryFull } from "lucide-react";

const Settings = () => {
  const { isShizukuGranted } = useShizuku();
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-turbo-purple" />
            Settings
          </h1>
          <p className="text-gray-400">Configure TurboBoost to your preferences</p>
        </header>

        <div className="space-y-6">
          {!isShizukuGranted && (
            <ShizukuSetup />
          )}
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-turbo-blue" />
                App Settings
              </CardTitle>
              <CardDescription>Configure general app behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="start-with-system">Start with system</Label>
                <Switch id="start-with-system" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-notifications">Show notifications</Label>
                <Switch id="show-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-optimize">Auto-optimize new games</Label>
                <Switch id="auto-optimize" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-turbo-purple" />
                Performance Settings
              </CardTitle>
              <CardDescription>Configure how TurboBoost optimizes games</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-boost" className="block">Auto RAM boost</Label>
                  <p className="text-xs text-gray-400 mt-1">Automatically boost RAM when a game starts</p>
                </div>
                <Switch id="auto-boost" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-dnd" className="block">Auto DND mode</Label>
                  <p className="text-xs text-gray-400 mt-1">Enable Do Not Disturb when gaming</p>
                </div>
                <Switch id="auto-dnd" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="network-optimize" className="block">Network optimization</Label>
                  <p className="text-xs text-gray-400 mt-1">Optimize network settings for gaming</p>
                </div>
                <Switch id="network-optimize" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BatteryFull className="h-5 w-5 text-green-500" />
                Battery Settings
              </CardTitle>
              <CardDescription>Balance performance and battery life</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="battery-save" className="block">Battery saving mode</Label>
                  <p className="text-xs text-gray-400 mt-1">Reduce performance to save battery</p>
                </div>
                <Switch id="battery-save" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="temp-monitor" className="block">Temperature monitoring</Label>
                  <p className="text-xs text-gray-400 mt-1">Alert if device gets too hot</p>
                </div>
                <Switch id="temp-monitor" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Button 
            className="w-full bg-turbo-purple hover:bg-turbo-purpleDark"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
