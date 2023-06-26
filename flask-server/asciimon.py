from termcolor import colored
from pokemon import Pokemon
from player import Player
import json
import random
import sys


class NewGame:
    def __init__(self, player, pokemon):
        self.player = player
        self.pokemon = pokemon
        self.difficulty = 1
        self.hintNumber = 3
        self.score = 0
        self.tries = 3
        self.gameState = {
            "player": self.player.name,
            "score": self.score,
            "tries": self.tries,
            "hintNumber": self.hintNumber,
            "difficulty": self.difficulty,
            "pokemon": self.pokemon.name,
            "pokeHTML": self.pokemon.pokeHTML,
        }

    def updateState(self):
        self.player = self.gameState["player"]
        self.score = self.gameState["score"]
        self.tries = self.gameState["tries"]
        self.hintNumber = self.gameState["hintNumber"]
        self.difficulty = self.gameState["difficulty"]
        self.pokemon = self.gameState["pokemon"]

    # Prompt and set the difficulty for the player.  Checks that they make the correct input.
    def setDiff(self, level):
        self.difficulty = level
        return level

    def guess(self, guess):
        # generate a new pokemon if guessed correctly and add 100 points to the players current score
        if guess.lower() == self.pokemon.name:
            self.score += 100
            self.tries = 3
            return {"correct": True, "points": 100, "name": self.pokemon.name}
        # Decrease the number of tries if the player guesses wrong
        # and decrease their current score by 25 points.
        # If the player uses up all of their tries, will update their account and provide ending prompts.
        else:
            self.score -= 25
            if self.tries > 1:
                self.tries -= 1
                return {"correct": False, "points": -25, "name": self.pokemon.name}
            else:
                return {"correct": False, "points": -25, "name": "game-over"}

    def hint(self):
        # show a random hint, but decrease the number of available hints.
        if len(self.pokemon.hints) > 0 and self.hintNumber > 0:
            randomNum = random.randint(0, len(self.pokemon.hints) - 1)
            self.hintNumber = self.hintNumber - 1
            return self.pokemon.hints.pop(randomNum)
        else:
            return {"hint": 0}

    # def restartGame(self):
    #     print(f"Score:{self.score}")
    #     self.player.updateAccount(self.score)
    #     print(
    #         "Type [restart] to play again, [high score] to see the leaderboard, and [exit] to close the game."
    #     )
    #     while True:
    #         prompt = input(":: ").lower()
    #         if prompt == "restart":  # RESTART GAME
    #             intro()
    #             ng = NewGame()
    #             print("Hello " + ng.player.name)
    #             ng.pokemon.displayPokemon(ng.setDiff())
    #             return ng
    #         elif prompt == "high score":  # DISPLAY HIGH SCORES
    #             highScore()
    #         elif prompt == "exit":  # END GAME
    #             print("bye!")
    #             sys.exit()


# # Display a running list of High Scores saved in the [playerData.json] file
# def scoreValue(e):
#     return e["score"]  # used to sort the list of player scores


# def highScore():
#     with open("playerData.json", "r") as file:
#         playerList = json.load(file)
#     playerList.sort(reverse=True, key=scoreValue)  # sort the values in reverse order
#     # stylize and print the scores to the terminal
#     print("----HIGH SCORES----")
#     print("|  NAME : SCORE   |")
#     for player in playerList:  # print the name and score of each player
#         # make sure that the name is max 6 letters and fills in the leftover space
#         scoreName = ""
#         count = 0
#         for letter in player["name"]:
#             count += 1
#             if count <= 6:
#                 scoreName += letter
#         scoreName += " " * (6 - count)
#         # make sure that the score fills in the leftover space
#         #!*[COMEBACK AND FIX FOR VERY HIGH SCORES]*!
#         scoreScore = str(player["score"])
#         count = 0
#         for number in scoreScore:
#             count += 1
#         scoreScore += " " * (6 - count)
#         print("|" + scoreName + " :   " + scoreScore + "|")
#     print("-" * 19)
