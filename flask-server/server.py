from flask import Flask, jsonify, request
from flask_cors import CORS
from asciimon import NewGame
from player import Player
from pokemon import Pokemon

app = Flask(__name__)
CORS(app)


@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    data = request.get_json()
    global player
    player = Player(data["name"], data["password"])
    return jsonify(player.props)


@app.route("/new-pokemon", methods=["GET", "POST"])
def new_pokemon():
    global pokemon
    global newGame
    pokemon = Pokemon()
    if len(newGame.oldPokemon) <= 150:
        if pokemon in newGame.oldPokemon:
            new_pokemon()
        else:
            newGame.pokemon = pokemon
            newGame.oldPokemon.append(pokemon)
            newGame.updateState()
            player.updateAccount(newGame.score)
            newGame.highScore()
            newGame.updateState()
            return jsonify(newGame.gameState)
    else:
        newGame.win = True
        newGame.updateState()
        player.updateAccount(newGame.score)
        newGame.highScore()
        newGame.updateState()
        return jsonify(newGame.gameState)


@app.route("/new-game", methods=["GET", "POST"])
def new_game():
    global newGame
    global pokemon
    pokemon = Pokemon()
    newGame = NewGame(player, pokemon)
    newGame.highScore()
    newGame.updateState()
    return jsonify(newGame.gameState)


@app.route("/guess", methods=["GET", "POST"])
def guess():
    global newGame
    data = request.get_json()
    guess = data["guess"]
    newGame.guess(guess)
    newGame.updateState()
    return jsonify(newGame.gameState)


if __name__ == "__main__":
    app.run(debug=True)
