import { useState } from "react";

interface Props {
  onSignIn: (item: boolean) => void;
}

function Signin(props: Props) {
  const { onSignIn } = props;
  const [nameValue, setNameValue] = useState<string>("");
  const [passValue, setPassValue] = useState<string>("");
  const [flaskResp, setFlaskResp] = useState<any>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://127.0.0.1:5000/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameValue, password: passValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from Flask:", data);
        setFlaskResp(data);
        setNameValue("");
        setPassValue("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <section className="startgame">
        <br />
        <p>Create an account or sign in using your username and password.</p>
        <div className="container">
          <form className="signinform" onSubmit={handleSubmit}>
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              name="name"
              type="text"
              placeholder="Name"
              className="input"
            />
            <input
              value={passValue}
              onChange={(e) => setPassValue(e.target.value)}
              name="password"
              type="text"
              placeholder="Password"
              className="input"
            />
            <br />

            <button type="submit" className="signin pixel-corners">
              Sign In
            </button>
          </form>
        </div>
        <br />
        {flaskResp.name ? (
          flaskResp.name === "err" ? (
            <p>Invalid username or password.</p>
          ) : (
            <>
              <p>Hello {flaskResp.name}! You are signed in.</p>
              <a
                href="#"
                onClick={() => {
                  onSignIn(true);
                }}
              >
                <button className="signin pixel-corners">Start Game</button>
              </a>
            </>
          )
        ) : (
          <p>You are not signed in.</p>
        )}

        <br />
        <br />
      </section>
    </>
  );
}

export default Signin;
