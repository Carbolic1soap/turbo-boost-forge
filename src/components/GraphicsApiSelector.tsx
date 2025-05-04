
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

export type GraphicsApi = "auto" | "skiagl" | "skiavk" | "vulkan" | "opengl";

interface GraphicsApiSelectorProps {
  selectedApi: GraphicsApi;
  onApiChange: (api: GraphicsApi) => void;
}

const GraphicsApiSelector = ({ selectedApi, onApiChange }: GraphicsApiSelectorProps) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="h-5 w-5 text-turbo-blue" />
          Graphics API
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          defaultValue={selectedApi} 
          onValueChange={(value) => onApiChange(value as GraphicsApi)}
          className="space-y-3 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auto" id="auto" />
            <Label htmlFor="auto" className="cursor-pointer">
              <div>
                <p className="font-medium">Auto (Recommended)</p>
                <p className="text-xs text-gray-400">Let system choose optimal API</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skiavk" id="skiavk" />
            <Label htmlFor="skiavk" className="cursor-pointer">
              <div>
                <p className="font-medium">Skia Vulkan</p>
                <p className="text-xs text-gray-400">Modern GPU acceleration with Vulkan backend</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="skiagl" id="skiagl" />
            <Label htmlFor="skiagl" className="cursor-pointer">
              <div>
                <p className="font-medium">Skia OpenGL</p>
                <p className="text-xs text-gray-400">Compatible GPU acceleration</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vulkan" id="vulkan" />
            <Label htmlFor="vulkan" className="cursor-pointer">
              <div>
                <p className="font-medium">Vulkan</p>
                <p className="text-xs text-gray-400">High-performance graphics API</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opengl" id="opengl" />
            <Label htmlFor="opengl" className="cursor-pointer">
              <div>
                <p className="font-medium">OpenGL</p>
                <p className="text-xs text-gray-400">Classic graphics API, high compatibility</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default GraphicsApiSelector;
