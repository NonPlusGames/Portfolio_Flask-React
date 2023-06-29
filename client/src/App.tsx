import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import pika from "./assets/pika.png";
import poke from "./assets/poke.png";
import Landing from "./components/Landing.tsx";
import Game from "./components/Game.tsx";
import Info from "./components/Info.tsx";

function App() {
  const [gameStart, setGame] = useState<any>(null);

  const handleStartGame = (item: string) => {
    if (item === "landing") {
      setGame(<Landing onStartGame={handleStartGame} />);
    } else if (item === "game") {
      setGame(<Game onStartGame={handleStartGame} />);
    } else if (item === "info") {
      setGame(<Info onStartGame={handleStartGame} />);
    }
  };

  return (
    <>
      <main className="container-fluid">
        <header className="row">
          <h1>
            Who's That <br />
            Asciimon!??
          </h1>
        </header>
        {/* Conditionally Load Components based on passed props */}
        {gameStart ? (
          <>{gameStart}</>
        ) : (
          <Landing onStartGame={handleStartGame} />
        )}
      </main>
      {/* Background */}
      <div className="bg-image pika">
        <img src={pika} alt="pikachu background image" />
      </div>
      <div className="bg-image poke">
        <img src={poke} alt="pokeball background image" />
      </div>
    </>
  );
}

export default App;
