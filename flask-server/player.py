import json
import os


class Player:
    def __init__(self, name, password):
        self.name = name
        self.__password = password
        self.highScore = self.handleAccount()["score"]
        self.props = {
            "name": self.name,
            "password": self.__password,
            "highScore": self.highScore,
        }

    def handleAccount(self):
        name = self.name
        password = self.__password
        player = {"name": name, "password": password, "score": 0}

        filename = "playerData.json"

        if not os.path.isfile(filename):
            # File doesn't exist, create a new one
            with open(filename, "w") as file:
                json.dump([player], file)

        # Read the contents of the file
        with open(filename, "r") as file:
            playerList = json.load(file)

        for i in range(len(playerList)):
            if name == playerList[i]["name"]:
                if password == playerList[i]["password"]:
                    return playerList[i]
                else:
                    player = {"name": "err", "password": "err", "score": 0}
                    playerList.append(player)
                    with open("playerData.json", "w") as file:
                        json.dump(playerList, file)
                    self.name = "err"
                    self.__password = "err"
                    self.highScore = -1
                    print("error")
                    print(player)
                    return player
            elif i == len(playerList) - 1:
                playerList.append(player)
                with open("playerData.json", "w") as file:
                    json.dump(playerList, file)
                return player

    def updateAccount(self, newScore):
        with open("playerData.json", "r") as file:
            playerList = json.load(file)

        for i in range(len(playerList)):
            if playerList[i]["name"] == self.name:
                if playerList[i]["score"] < newScore:
                    playerList[i]["score"] = newScore
                    break

        with open("playerData.json", "w") as file:
            json.dump(playerList, file)
