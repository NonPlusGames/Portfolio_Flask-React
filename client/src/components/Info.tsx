//An Info component all about "Who's That Asciimon!?!!" and how to play the game
import React from "react";
import { CSSProperties } from "react";
interface Props {
  onStartGame: (item: string) => void;
}

function Info(props: Props) {
  const { onStartGame } = props;
  return (
    <>
      <nav className="row d-flex justify-content-center gx-5">
        <div className="col-6 col-lg-4 d-flex justify-content-start justify-content-lg-end">
          <button
            className="infobutton one"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#instructions"
            aria-expanded="true"
            aria-controls="instructions"
            autoFocus
          >
            Instructions
          </button>
        </div>
        <div className="col-6 col-lg-4">
          <button
            className="infobutton two"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#manifesto"
            aria-expanded="false"
            aria-controls="manifesto"
          >
            Manifesto
          </button>
        </div>
      </nav>
      <article
        className="row accordion d-flex justify-content-center"
        id="accordion"
      >
        <section
          className="information collapse show"
          data-bs-parent="#accordion"
          id="instructions"
        >
          {/* 'p' tag conent not indented to facilitate pre-wrap css */}
          <p>
            Thankyou for playing [Who's That Asciimon!]. This game is a riff on
            'Who's That Pokemon!', which appeared in-between episodes of the
            cartoon adaptation of the widely popular video game series
            'Pokemon'. Much like the series, this game will show you a
            silhouette of a random pokemon made out of ascii characters and you
            have to guess who it is. Please refer to the following rules while
            playing. Have Fun!
          </p>
          <p>RULES:</p>
          <p>
            1) You have 3 guesses to correctly name the pokemon. +100pts on a
            correct guess. -25pts on a wrong guess.
          </p>
          <p>2) You have access to a total of 3 hints for the whole game.</p>
          <p>
            3) If you ever get all three guesses wrong. The game will end and
            save your High Score.
          </p>
          <br />
          <p>
            <em>
              (the game also saves your score if you accidentially refresh the
              page or exit)
            </em>
          </p>
        </section>
        <section
          className="information collapse"
          data-bs-parent="#accordion"
          id="manifesto"
        >
          <p>
            This project was designed with a set of <b>MOBILE FIRST</b>{" "}
            principles:
          </p>
          <p>
            <b>CONTENT</b> - Each page has the main content large, readable, and
            centered.
          </p>
          <p>
            <b>TOUCH FRIENDLY</b> - Simple navigation that is intuitive to touch
            input.
          </p>
          <br />
          <button>
            <p>
              Buttons are designed to be large, readable, and include a shadow
              for enhanced contrast.
            </p>
          </button>
          <br />
          <br />
          <button className="infobutton">
            <p>
              Some buttons have inverted colors to indicate that they have a
              seperate functional use.
            </p>
          </button>
          <br />
          <br />
          <p>
            <b>MINIMALIST PALETTE</b> -
          </p>
          <div className="row colors grid column-gap-1">
            <div className="col-1 blue" title="blue" />
            <div className="col-1 red" title="red" />
            <div className="col-1 yellow" title="yellow" />
            <div className="col-1 white" title="white">
              .
            </div>
          </div>
          <br />
          <p>
            This palette is reminiscent of the original red, blue, and yellow
            pokemon game releases. As it is based on primary colors, the palette
            contrasts well yet is more nuanced since it consists of warmer and
            cooler hues.
          </p>
          <p>
            The background utilizes <span className="red">#F62D14</span> as it's
            "white space" which is mostly blank except for large images that
            reinforce the theme.
          </p>
          <p>
            The buttons alternate <span className="yellow">#FAD61D</span> and
            <span className="blue">#3466AF</span> creating a nice contrast with
            the text.
          </p>
          <p>
            <img
              src="../src/assets/bootstrap-logo.svg"
              width="5%"
              alt="boostrap icon"
            />
            <b> Bootstrap</b> - allows for content organization and responsive
            design. Buttons, text, and images are resized and shifted when
            viewed on larger screens.
          </p>
          <p>
            This informational panel was created using a combination of 'row',
            'col', 'collapse', and 'accordion'. 'collapse' will open and close
            the content when the appropriate button is pressed while 'accordian'
            ensures only one panel is visible at a time.
          </p>
          <p>
            <b>FONT</b> - 'Press Start 2P' is a fun and readable google font
            reminiscent of 16-bit video games.
          </p>

          <p>
            <b>Flask + React</b> -
          </p>
          <p>
            <b>Flask</b> - Framework for the python backend. All of the heavy
            lifting for the game logic is done here and served to React.
          </p>
          <p>
            <b>React</b> - Provides libraries to serve the front end. The game
            is rendered here and the user input is sent back to Flask.
          </p>
        </section>
      </article>

      {/* ------------------buttons------------------ */}
      <nav className="row">
        <div className="col d-flex justify-content-end">
          <a
            href="#"
            onClick={() => {
              onStartGame("game");
            }}
          >
            <button className="start pixel-corners">START</button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Info;
