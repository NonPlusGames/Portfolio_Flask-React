import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import Signin from "../components/Signin";
import DOMPurify from "dompurify";

interface Props {
  onStartGame: (item: string) => void;
}

function Game(props: Props) {
  const { onStartGame } = props;
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [flaskResp, setFlaskResp] = useState<any>(null);
  const [guessFlaskResp, setGuessFlaskResp] = useState<any>(null);
  const [guessValue, setGuessValue] = useState<any>("");
  const [resultScreen, setResultScreen] = useState<boolean>(false);
  const [playerNickname, setPlayerNickname] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hint, setHint] = useState<boolean>(false);

  useEffect(() => {
    //after signing in, start the new game using the new-game endpoint
    if (signedIn) {
      fetch("http://127.0.0.1:5000/new-game")
        .then((response) => response.json())
        .then((data) => {
          console.log("Sign in data received from Flask:", data);
          setFlaskResp(data);
          setPlayerNickname(data.player.substring(0, 4));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [signedIn]);

  const handleSignIn = (item: boolean) => {
    setSignedIn(item);
  };

  const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://127.0.0.1:5000/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guessValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Guess data received from Flask:", data.guess);
        console.log("Game State data received from Flask:", data);
        setGuessFlaskResp(data.guess);
        setFlaskResp(data);
        setResultScreen(true);
        if (data.guess.name == "game-over") {
          setGameOver(true);
        }
        setGuessValue("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleNewGuess = () => {
    if (guessFlaskResp && guessFlaskResp.correct == true) {
      fetch("http://127.0.0.1:5000/new-pokemon")
        .then((response) => response.json())
        .then((data) => {
          console.log("New Poke data received from Flask:", data);
          setFlaskResp(data);
          setGuessFlaskResp(null);
          setGuessValue("");
          setResultScreen(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setGuessFlaskResp(null);
      setResultScreen(false);
    }
  };

  const handleHint = () => {
    if (hint == false) {
      setHint(true);
      if (flaskResp) {
        fetch("http://127.0.0.1:5000/hint")
          .then((response) => response.json())
          .then((data) => {
            console.log("New Poke data received from Flask:", data);
            setFlaskResp(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else if (hint == true) setHint(false);
  };

  return (
    <>
      <article className="row d-flex justify-content-center">
        {" "}
        {flaskResp && flaskResp.win ? (
          <div className="startgame">
            <p>
              You got {guessFlaskResp.name} Correct! +{guessFlaskResp.points}pts
            </p>
            <p>
              CONGRATULATIONS! YOU ARE A POKEMON GUESSING MASTER! YOU GUESSED
              ALL 151
            </p>
            <div className="highscores">
              <p
                className="highscores-inner"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(flaskResp.highScoreString),
                }}
              ></p>
            </div>
            <nav className="row">
              <a
                href="#"
                onClick={() => {
                  onStartGame("landing");
                }}
              >
                <button className="signin pixel-corners">START OVER</button>
              </a>
            </nav>
          </div>
        ) : resultScreen ? (
          guessFlaskResp && guessFlaskResp.correct == true ? (
            <div className="startgame">
              <p>
                You got {guessFlaskResp.name} Correct! +{guessFlaskResp.points}
                pts
              </p>
              <nav className="row">
                <a href="#" onClick={handleNewGuess}>
                  <button className="signin pixel-corners">New Pokemon</button>
                </a>
              </nav>
            </div>
          ) : (
            <div className="startgame">
              {gameOver ? (
                <>
                  <p>
                    You got {flaskResp.pokemon} Incorrect!{" "}
                    {guessFlaskResp.points}
                    pts Sorry! You have no more tries left. Game Over!
                  </p>
                  <div className="highscores">
                    <p
                      className="highscores-inner"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(flaskResp.highScoreString),
                      }}
                    ></p>
                  </div>
                  <nav className="row">
                    <a
                      href="#"
                      onClick={() => {
                        onStartGame("landing");
                      }}
                    >
                      <button className="signin pixel-corners">
                        START OVER
                      </button>
                    </a>
                  </nav>
                </>
              ) : (
                <>
                  <p>
                    Your guess was Incorrect! {guessFlaskResp.points}
                    pts
                  </p>
                  <nav className="row">
                    <a href="#" onClick={handleNewGuess}>
                      <button className="signin pixel-corners">
                        Try Again
                      </button>
                    </a>
                  </nav>
                </>
              )}
            </div>
          )
        ) : signedIn ? (
          <div className="startgame">
            {flaskResp && flaskResp.player ? (
              <>
                <p className="hud d-flex align-items-center justify-content-center">
                  <span>PLAYER:{playerNickname}</span> SCORE:
                  <span className="score-container">
                    <span className="score">{flaskResp.score}</span>
                  </span>{" "}
                  <span className="tries"> TRIES:{flaskResp.tries}</span>
                </p>
                <p className="line">_____________________________</p>
                <p className="hint row">
                  <div className="d-flex align-items-center justify-content-start">
                    <button
                      onClick={handleHint}
                      className="infobutton pixel-corners"
                    >
                      HINT ({flaskResp.hintNumber})
                    </button>
                    {hint ? <span>{flaskResp.hintValue}</span> : <></>}
                  </div>
                </p>
                <pre>
                  <div
                    className="pokemon"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(flaskResp.pokeHTML),
                    }}
                  ></div>
                </pre>
              </>
            ) : (
              <p>There was an error setting up your account. Please reload.</p>
            )}
          </div>
        ) : (
          <Signin onSignIn={handleSignIn} />
        )}
      </article>

      {/* ------------------buttons------------------ */}

      <div className="row guessform">
        {resultScreen || signedIn == false ? (
          <></>
        ) : (
          <form onSubmit={handleGuessSubmit} className="row">
            <div className="d-flex align-items-center justify-content-center">
              <input
                value={guessValue}
                onChange={(e) => setGuessValue(e.target.value)}
                name="guess"
                type="text"
                placeholder="TYPE YOUR GUESS HERE"
                className="input"
              />
              <button type="submit" className="guess pixel-corners">
                GUESS
              </button>
            </div>
          </form>
        )}
      </div>

      <nav className="row">
        <div className="col d-flex justify-content-end">
          <a
            href="#"
            onClick={() => {
              onStartGame("landing");
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
