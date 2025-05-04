import Layout from "@/components/Layout";
import SystemStatsCard from "@/components/SystemStatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/providers/StatsProvider";
import { BarChart3, Cpu, Memory, Battery, Clock } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useState, useEffect } from "react";

const Stats = () => {
  const { stats } = useStats();
  const [historyData, setHistoryData] = useState<Array<any>>([]);
  
  // Add current stats to history every 3 seconds
  useEffect(() => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setHistoryData(prev => {
      const newData = [...prev, { time, ...stats }];
      // Keep last 20 readings
      if (newData.length > 20) return newData.slice(-20);
      return newData;
    });
    
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setHistoryData(prev => {
        const newData = [...prev, { time, ...stats }];
        if (newData.length > 20) return newData.slice(-20);
        return newData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout>
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-turbo-purple" />
            System Statistics
          </h1>
          <p className="text-gray-400">Monitor your device performance</p>
        </header>

        <div className="space-y-6">
          <SystemStatsCard />
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Memory className="h-5 w-5 text-turbo-purple" />
                RAM Usage History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1F2C",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ramUsage"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={false}
                      name="RAM Usage (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-orange-500" />
                CPU Temperature History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" domain={[20, 80]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1F2C",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cpuTemp"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                      name="CPU Temp (°C)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-turbo-blue" />
                FPS History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" domain={[0, 70]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1F2C",
                        borderColor: "#333",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="fps"
                      stroke="#1EAEDB"
                      strokeWidth={2}
                      dot={false}
                      name="FPS"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Stats;
