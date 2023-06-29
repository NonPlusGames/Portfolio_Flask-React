import { useState } from "react";
import { CSSProperties } from "react";
import ascii from "../assets/ascii.jpg";

interface Props {
  onStartGame: (item: string) => void;
}

function Landing(props: Props) {
  const { onStartGame } = props;

  return (
    <>
      <article className="row d-flex justify-content-center">
        <div className="window col col-lg-4">
          <img src={ascii} alt="ascii who's that pokemon picture" />
        </div>
      </article>

      {/* ------------------buttons------------------ */}
      <nav className="row justify-content-lg-center">
        <div className="col col-lg-2 d-flex justify-content-center">
          <a
            href="#"
            onClick={() => {
              onStartGame("game");
            }}
          >
            <button className="start pixel-corners">START</button>
          </a>
        </div>
        <div className="col col-lg-2 d-flex justify-content-center">
          <a
            href="#"
            onClick={() => {
              onStartGame("info");
            }}
          >
            <button className="start pixel-corners">INFO</button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Landing;
