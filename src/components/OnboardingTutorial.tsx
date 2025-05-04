
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to TurboBoost",
    description: "The ultimate game booster for Android that doesn't require root access. Let's set things up to optimize your gaming experience."
  },
  {
    title: "Shizuku Setup",
    description: "TurboBoost uses Shizuku to make system-level optimizations. You'll need to install and grant Shizuku permissions for full functionality."
  },
  {
    title: "Permissions",
    description: "TurboBoost needs accessibility services to detect games and display the floating toolbox. We'll also need permission to modify system settings."
  },
  {
    title: "Battery Optimization",
    description: "For the best experience, please exclude TurboBoost from battery optimization so it can work in the background while you're gaming."
  },
  {
    title: "You're All Set!",
    description: "TurboBoost is now ready to enhance your gaming experience. Explore the app to optimize your games and boost performance."
  }
];

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const OnboardingTutorial = ({ onComplete }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(true);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      onComplete();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-gradient">{steps[currentStep].title}</DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex justify-center">
          {steps[currentStep].image && (
            <img 
              src={steps[currentStep].image} 
              alt={steps[currentStep].title} 
              className="max-h-40 object-contain rounded-lg" 
            />
          )}
          
          {!steps[currentStep].image && (
            <div className="h-20 flex items-center justify-center">
              {currentStep === steps.length - 1 ? (
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse-boost">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full bg-turbo-purple/20 flex items-center justify-center animate-pulse-boost">
                  <div className="h-12 w-12 rounded-full bg-turbo-purple/40 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-turbo-purple"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 w-6 rounded-full ${
                    index === currentStep ? 'bg-turbo-purple' : 'bg-gray-700'
                  }`}
                ></div>
              ))}
            </div>
            
            <Button 
              className="bg-turbo-purple hover:bg-turbo-purpleDark"
              onClick={handleNext}
            >
              {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
