
import Layout from "@/components/Layout";
import GameList from "@/components/GameList";
import { GameController } from "lucide-react";

const Games = () => {
  return (
    <Layout>
      <div className="container max-w-4xl pt-8 px-4 pb-20">
        <header className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GameController className="h-6 w-6 text-turbo-purple" />
            Game Library
          </h1>
          <p className="text-gray-400">Manage and optimize your games</p>
        </header>

        <GameList />
      </div>
    </Layout>
  );
};

export default Games;
