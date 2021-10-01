class Room {

    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._charPresent = "";
        this._roomItem = "";
        this._linkedRooms = {}
    }

    describe() {
        return "You have entered the " + this._name + "." + this._description
    }

    get linkedRooms() {
        return this._linkedRooms
    }

    get name() {
        return this._name
    }

    get charPresent() {
        return this._charPresent
    }

    set charPresent(value) {
        this._charPresent = value
    }

    get roomItem() {
        return this._roomItem
    }

    set roomItem(value) {
        this._roomItem = value;
    }

    linkRoom(direction, room) {
        this._linkedRooms[direction] = room
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            console.log("Move: " + this._name + " -> " + this._linkedRooms[direction]._name);
            return this._linkedRooms[direction];
        } else {
            alert("Sorry, you can't go that way!")
            return this;
        }
    }
}

class char {

    constructor(name, description, conversation) {
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }

    describe() {
        return " You are greeted by " + this._name + ". " + this._description
    }

    get name() {
        return this._name
    }

    get conversation() {
        return this._conversation
    }

    set conversation(text) {
        this._conversation = text;
    }

    talk() {
        return this._name + " says " + this._conversation;
    }

}

class Item {

    constructor(name, description, suggestion) {
        this._name = name;
        this._description = description;
        this._suggestion = suggestion;

    }

    describe() {
        return "You have found a " + this._name + ". " + this._description + this._suggestion
    }
}


// rooms

const hallway = new Room("hallway", " The hallway is a long corridor with high ceilings and is bright and welcoming. Go east to visit the dining room, west to the living room.")
const kitchen = new Room("kitchen", " The kitchen is a bright room, with large doors leading outside. ")
const livingRoom = new Room("living room", " The living room is a snug and cosy room with a lovely fireplace. ")
const diningRoom = new Room("dining room", " The dining room is bright and airy, with a large table taking up most of the room. Go west to go back to the hallway")
const garden = new Room("garden", " You have found the garden! The garden is huge, green and sunny. It is the best place to play fetch with Finn. Enjoy!")

// directions -  

hallway.linkRoom("east", diningRoom)
hallway.linkRoom("west", livingRoom)
diningRoom.linkRoom("west", hallway)
livingRoom.linkRoom("east", hallway)
livingRoom.linkRoom("west", kitchen)
garden.linkRoom("north", kitchen)
kitchen.linkRoom("south", garden)
kitchen.linkRoom("east", livingRoom)
kitchen.linkRoom("north", hallway)


//document.getElementById('game').innerHTML = currentRoom.describe()

// characters / items 

const Finn = new char("Finn", "Finn is a friendly wolf who loves to play, and he might need your help.", "'Can you help me to find my toys? Let's check the other rooms.'")
// const Hoover = new char("Hoover", "This is Finn's biggest fear.", "I am here to ruin Finn's day, he will be too scared to play now.")

const ball = new Item("ball", " This is one of Finn's favourite toys.", " Try to find the garden so we can play ball with Finn!")

kitchen.roomItem = ball;
livingRoom.charPresent = Finn;
// diningRoom.charPresent = Hoover;

console.log(kitchen.roomItem.describe())
// console.log(diningRoom.charPresent.talk())


function displayRooms() {
    document.getElementById('game').innerHTML = currentRoom.describe()
    if (currentRoom.charPresent !== "") {
        document.getElementById('game').innerHTML += currentRoom.charPresent.describe() + "<br>"
        document.getElementById('game').innerHTML += currentRoom.charPresent.talk() + "<br>"
    }

    if (currentRoom.roomItem !== "") {
        document.getElementById('game').innerHTML += currentRoom.roomItem.describe()
    }
}

let currentRoom = hallway

function startGame() {
    displayRooms()

    document.getElementById('command').style = ""
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("command").value;

            const direction = ["north", "south", "east", "west"]
            const ideas = ["talk"]
            if (direction.includes(command)) {
                currentRoom = currentRoom.move(command);
                displayRooms()
                document.getElementById('command').value = ''
            } else {
                alert("invalid command")
            }
        }
    })
}

// let msg = ""
// function charTalk(command) {
//     switch (command) {
//         case "talk": 
//         msg = charPresent.talk() 
//         alert(msg)
//         break
//     }

// }

// function startGame() {
//     displayRooms()

// document.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       command = document.getElementById("command").value;
//       const directions = ["north", "south", "east", "west"];
//       const commands = ["talk"];
//       if (directions.includes(command)) {
//         currentRoom = currentRoom.move(command);
//         displayRooms();
//       } else if (commands.includes(command)) {
//         charTalk(command, currentRoom.character)
//       } else {
//         alert("Invalid command, try again.")
//       }
//     }
// })
// }