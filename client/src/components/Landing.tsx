import { useState } from "react";
import { CSSProperties } from "react";
import ascii from "../assets/ascii.jpg";

interface Props {
  onStartGame: (item: boolean) => void;
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
      <nav className="row justify-content-lg-center">
        <div className="col col-lg-2 d-flex justify-content-center">
          <a
            href="#"
            onClick={() => {
              onStartGame(true);
            }}
          >
            <button className="start pixel-corners">START</button>
          </a>
        </div>
        <div className="col col-lg-2 d-flex justify-content-center">
          <button className="info pixel-corners dflex">
            <a href="info.html">INFO</a>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Landing;
