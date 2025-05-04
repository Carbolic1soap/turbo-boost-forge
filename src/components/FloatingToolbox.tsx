
import { useFloatingToolbox } from "@/providers/FloatingToolboxProvider";
import { useGame } from "@/providers/GameProvider";
import { useStats } from "@/providers/StatsProvider";
import { Button } from "@/components/ui/button";
import { X, Minimize, Maximize, Cpu, Ram, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const FloatingToolbox = () => {
  const { isToolboxVisible, toolboxPosition, hideToolbox, moveToolbox, shortcuts } = useFloatingToolbox();
  const { performRamBoost } = useGame();
  const { stats } = useStats();
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const toolboxRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    if (toolboxRef.current) {
      const rect = toolboxRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging) {
      moveToolbox(
        e.clientX - dragOffset.x,
        e.clientY - dragOffset.y
      );
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging]);

  if (!isToolboxVisible) return null;

  return (
    <div
      ref={toolboxRef}
      className="fixed z-50 glass-morphism rounded-lg overflow-hidden shadow-lg"
      style={{
        left: `${toolboxPosition.x}px`,
        top: `${toolboxPosition.y}px`,
        width: expanded ? "280px" : "80px",
        transition: isDragging ? "none" : "width 0.3s ease",
      }}
    >
      {/* Header */}
      <div 
        className="p-2 bg-gray-900/80 flex items-center justify-between cursor-move"
        onMouseDown={handleDragStart}
      >
        <span className="text-xs font-medium text-turbo-purple">TurboBoost</span>
        <div className="flex gap-1">
          {expanded ? (
            <ChevronUp
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setExpanded(false)}
            />
          ) : (
            <ChevronDown
              className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setExpanded(true)}
            />
          )}
          <X
            className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
            onClick={hideToolbox}
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`flex items-center gap-3 px-3 py-2 bg-black/40 border-t border-b border-white/5 ${expanded ? 'justify-between' : 'justify-center'}`}>
        <div className="flex items-center gap-1">
          <Ram className="h-3 w-3 text-turbo-purple" />
          <span className="text-xs">{Math.round(stats.ramUsage)}%</span>
        </div>
        {expanded && (
          <>
            <div className="flex items-center gap-1">
              <Cpu className="h-3 w-3 text-orange-500" />
              <span className="text-xs">{Math.round(stats.cpuTemp)}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-turbo-blue font-medium">{stats.fps} FPS</span>
            </div>
          </>
        )}
      </div>

      {/* Control Buttons */}
      <div className={`p-2 ${expanded ? 'grid grid-cols-4 gap-2' : 'space-y-2'}`}>
        <ToolButton onClick={performRamBoost} icon="boost" label="RAM" />
        <ToolButton onClick={() => console.log("Screenshot")} icon="screenshot" label="Screenshot" />
        <ToolButton onClick={() => console.log("Record")} icon="record" label="Record" />
        <ToolButton onClick={() => console.log("Settings")} icon="settings" label="Settings" />
      </div>

      {/* App Shortcuts */}
      {expanded && (
        <div className="p-2 pt-0 grid grid-cols-4 gap-2">
          {shortcuts.map(shortcut => (
            <AppShortcut key={shortcut.id} name={shortcut.name} icon={shortcut.icon} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ToolButtonProps {
  onClick: () => void;
  icon: string;
  label: string;
}

const ToolButton = ({ onClick, icon, label }: ToolButtonProps) => {
  // This would use actual icons in a real app
  const iconElement = () => {
    switch (icon) {
      case 'boost':
        return <Memory className="h-4 w-4" />;
      case 'screenshot':
        return <div className="h-4 w-4 border border-current rounded-sm" />;
      case 'record':
        return <div className="h-4 w-4 rounded-full border border-current" />;
      case 'settings':
        return <Cpu className="h-4 w-4" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };
  
  return (
    <button
      onClick={onClick}
      className="bg-white/10 hover:bg-turbo-purple/40 rounded p-2 flex flex-col items-center justify-center transition-colors text-white"
    >
      {iconElement()}
      <span className="text-[10px] mt-1">{label}</span>
    </button>
  );
};

interface AppShortcutProps {
  name: string;
  icon: string;
}

const AppShortcut = ({ name, icon }: AppShortcutProps) => {
  return (
    <button className="bg-white/5 hover:bg-white/10 rounded p-2 flex flex-col items-center justify-center">
      <div className="h-8 w-8 rounded-full overflow-hidden">
        <img src={icon} alt={name} className="h-full w-full object-cover" />
      </div>
      <span className="text-[10px] mt-1 truncate w-full text-center">{name}</span>
    </button>
  );
};

export default FloatingToolbox;
