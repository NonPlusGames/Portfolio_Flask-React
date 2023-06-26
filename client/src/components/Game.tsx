import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import Signin from "../components/Signin";
import DOMPurify from "dompurify";

interface Props {
  onStartGame: (item: boolean) => void;
}

function Game(props: Props) {
  const { onStartGame } = props;
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [flaskResp, setFlaskResp] = useState<any>(null);

  useEffect(() => {
    //after signing in, start the new game using the new-game endpoint
    if (signedIn) {
      fetch("http://127.0.0.1:5000/new-game")
        .then((response) => response.json())
        .then((data) => {
          console.log("Data received from Flask:", data);
          setFlaskResp(data);
          console.log(data.pokeHTML);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [signedIn]);

  const handleSignIn = (item: boolean) => {
    setSignedIn(item);
  };

  return (
    <>
      {signedIn ? (
        <div className="startgame">
          {flaskResp && flaskResp.player ? (
            <pre>
              <div
                className="pokemon"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(flaskResp.pokeHTML),
                }}
              ></div>
            </pre>
          ) : (
            <p>No player URL available</p>
          )}
        </div>
      ) : (
        <Signin onSignIn={handleSignIn} />
      )}
      {/* ------------------buttons------------------ */}
      <nav className="row">
        <div className="col d-flex justify-content-center">
          <a
            href="#"
            onClick={() => {
              onStartGame(false);
            }}
          >
            <button className="start pixel-corners">RETURN</button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Game;
