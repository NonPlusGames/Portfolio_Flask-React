from flask import Flask, jsonify, request
from flask_cors import CORS
from asciimon import NewGame
from player import Player
from pokemon import Pokemon

app = Flask(__name__)
CORS(app)


@app.route("/hello", methods=["GET"])
def hello():
    return {"name": "Hello World!"}


@app.route("/submit-data", methods=["GET", "POST"])
def submit_data():
    data = request.get_json()
    print(data)
    return jsonify(data)


@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    data = request.get_json()
    global player
    player = Player(data["name"], data["password"])
    return jsonify(player.props)


@app.route("/new-pokemon", methods=["GET", "POST"])
def new_pokemon():
    global pokemon
    pokemon = Pokemon()
    newGame.pokemon = pokemon
    return jsonify(pokemon.name)


@app.route("/new-game", methods=["GET", "POST"])
def new_game():
    global newGame
    global pokemon
    pokemon = Pokemon()
    newGame = NewGame(player, pokemon)
    return jsonify(newGame.gameState)


@app.route("/guess", methods=["GET", "POST"])
def guess():
    data = request.get_json()
    print(data)
    newGame.guess(data["guess"])
    return jsonify(newGame.gameState)


if __name__ == "__main__":
    app.run(debug=True)
