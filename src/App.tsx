
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShizukuProvider } from "./providers/ShizukuProvider";
import { GameProvider } from "./providers/GameProvider";
import { StatsProvider } from "./providers/StatsProvider";
import { FloatingToolboxProvider } from "./providers/FloatingToolboxProvider";
import Index from "./pages/Index";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Performance from "./pages/Performance";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import FloatingToolbox from "./components/FloatingToolbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShizukuProvider>
        <GameProvider>
          <StatsProvider>
            <FloatingToolboxProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/games/:gameId" element={<GameDetail />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingToolbox />
              </BrowserRouter>
            </FloatingToolboxProvider>
          </StatsProvider>
        </GameProvider>
      </ShizukuProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
