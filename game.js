/***********************************TO DO LIST***************************************/
/*
1. ADD BETTER SECRET INTRO TO INTRODUCTION
*/
/***********************************HTML FUNCTIONS***************************************/
/***FUNCTIONS AND VARAIBLES IN CHARGE OF DISPLAYING GAME TO HTML*/
let main = document.querySelector("main");
let input = document.querySelector("input");

function print(text) {
  // to print some text we first create a new paragraph tag, like having a <p></p> in HTML
  var p = document.createElement("p");
  // Then we put our text inside the new p element
  p.innerHTML = text;
  // We add our p element to the document as the last thing in the html body
  main.appendChild(p);
  // The player may have scrolled the page, so make sure we scroll to make the new text visible
  p.scrollIntoView();
}

function getInput(evt) {
  if (evt.code === "Enter") {
    let text = input.value;
    input.value = "";
    getOneCommand(text);
  }
}

input.addEventListener("keyup", getInput, false);

/***********************************STORY FUNCTIONS***************************************/
var character = { inventory: [], memories: [], location: "introduction" };

/***LONG DESCRIPTION TEXT FOR WAITDUNGEON part WAITING */
var intro = "I’m told the preface is the place where the author writes a kind of emotionally connecting elevator pitch about how a story " + 
"was inspired. A paragraph or two where writers can freely—and perhaps unwittingly—disclose to the reader how they managed to justify " + 
"that writing on harrowing topics is somehow more therapeutic then attending actual therapy.<br><br>"  + "Well, for your sanity—and what is " + 
"left of my dignity—this is not an actual preface. It just so happens, that I like the word preface better and there’s little any one " + 
"can do to stop me in using it. Instead, you can consider this as a kind of instructional guide. A momentary lapse in story where " + 
"you can begin to understand what it is you’ve actually clicked on.<br><br> " + "But where are my manners?<br><br>" + "Hello! And welcome to the bare bones, " + 
"first edition of “Where We Wait.” A short horror story of…well I suppose I’ll the writing do it’s job and tell you that. If you’ve " + 
"made it this far into reading it seems that my taglines must have caught something of your interest and I hope I can capture it for just " + 
"a little while longer.<br><br>" + "For those of you who are avid readers and or text based game enthusiasts you mind find it more interesting " + 
"to—<i>wait around</i>. And for those who haven’t the faintest idea on what those words might imply, I implore you to stick with me before I " + 
"unsympathetically kick you into the plot hole that is this demo.<br><br>" + "I’m certain at this point in time, you might have noticed a box " + 
"at the bottom of this text. Great job! For the duration of this story, you can think of this box as a mouthpiece. " + 
"Something no different then the string of consciousness that keeps encouraging you to read this droll preface right now. " + 
"Now, do me a favor. Click inside that box and type in the word help (you don’t need to italicize the word)."

var help_intro = "Wonderful! Look how good you are at doing what you’re asked. What you’ve just done, my obedient friend, is called an action." + 
"You’ll find actions to be a useful thing in this kind of story and the help action here has just been kind enough to display a list of particularly" +  
"useful actions you can perform throughout the entirety of this story. <br> <br>WARNING: The help action does not provide an extensive list, there " + 
"are some actions that you must figure out on your own. Or else this would be a lot less entertaining of a puzzle game. <br> <br>Well, I suppose that" +
" is mostly everything you need to know to get started. I’m sorry to say that we won’t be meeting again and perhaps even more sorry that I’m " + 
"likely the last helpful voice you’ll hear in your head for a while. Now, since you were so kind as to read through the entirety of this—unlike " + 
"some—I won’t kick you into the story but I do sincerely implore you to—<i>wait around.</i> "

var secret_intro = "Oh. Did you suspect something might happen if you refused to do what was asked of you? Good. It’ll take a curious and rebellious " + 
"nature, like yours, to survive this kind of story. In fact, since you seem so naturally inclined to these kind of games, why don’t I just throw you " + 
"into it already. Goodbye, my fiendish friend, and <i>good luck.</i>"

var move_intro = "Oh cool you were wanting to try out the move command! It's definitely a very nifty tool make sure to use it a lot and pay attention" + 
"to any hints in the game on where you should go. Feel free to wait aroudn now, after all, it's only the introduction there's no where to go here."


var waitDungeon = {
  /*******FIRST PART OF STORY (INTRO)********/
  "introduction": {
    short_description: "introduction",
    long_description: intro,
    contents: [],
    exits: {wait: "waiting_here"}
  },
  "help_intro": { //any basic commands played with after this can be accepted for funny text dialogue
    short_description: "help_intro",
    long_description: help_intro,
    contents: [],
    exits: {left: "move_intro", right: "move_intro", forward: "move_intro", back: "move_intro", wait: "waiting_here"}
  }, 
  "move_intro": { 
    short_description: "move_intro",
    long_description: move_intro,
    contents: [],
    exits: {wait: "waiting_here"}
  }, 
  "memory_intro": { //give memory 
    short_description: "memory_intro",
    long_description: "[New Memory Unlocked: introductions]",
    contents: [],
    exits: {wait: "waiting_here"}
  },
  "secret_intro": { //no commands but help or wait accepted
    short_description: "secret_intro",
    long_description: secret_intro,
    contents: [],
    exits: {}
  }, 
  /*******SECOND PART OF STORY (HERE)********/
  "waiting_here": {
    short_description: "waiting_here",
    long_description: "waitng_here",
    contents: [],
    exits: {}
  },
};

/***********************************COMMAND FUNCTIONS***************************************/
//Function that pulls command from html form
function command_split(str) {
  // splits string into an array of words, taking out all whitespace
  var parts = str.split(/\s+/); 
  // command is the first word in the array, which is removed from the array
  var command = parts.shift();
  // the rest of the words joined together.  If there are no other words, this will be an empty string 
  var object = parts.join(" "); 
  return [command, object];
}

var room, command, verb, obj, move_verb;

//take directions and turn into short hand
function long_direction(short) {
  let key = short[0];
  if(short == "remember") {
    return "remember";
  }
  else if(short == "right") {
    return "right";
  }
  return {
    n: "north",
    e: "east",
    w: "west",
    u: "up",
    d: "dont",
    i: "in", // we don't actually use this short form, because 'inventory'
    m: "memories",
    r: "remember",
    k: "knock",
    n: "no",
    o: "open",
    f: "forward",
    b: "back",
    l: "left",
    w: "wait",
    y: "yes",
    s: "stop",
    t: "take"
  }[key];
}

function getOneCommand(text) {
  room = waitDungeon[character.location];
  command = command_split(text.toLowerCase());
  verb = command[0];
  obj = command[1];
  console.log("verb: " + verb + ", object: " + obj);
  if (
    [
      "right",
      "left",
      "forward",
      "back",
      "up",
      "down",
      "in",
      "no",
      "wait",
      "yes",
      "stop",
      "remember",
      "dont",
      "open",
      "knock",
      "take",
      "k",
      "r",
      "l",
      "f",
      "b",
      "u",
      "d",
      "w",
      "y",
      "o",
      "st",
      "t"
    ].includes(verb)
  ) {
    move(verb);
  } else if (["inventory", "i", "bag"].includes(verb)) {
    printInventory();
  } else if (["memories", "m", "memory"].includes(verb)) {
    printMemories();
    //has no memory so give one in intro if player wants to try command
    if(room.short_description == "help_intro" || (room.short_description == "move_intro")) {
      print("Oops! It looks like you dont have any memories right now so let me give you one! Try typing memory again.")
      let memory = "introductions";
      if(character.memories.includes(memory)) {
        return;
      }
      character.memories.push(memory);
      move_to_room("memory_intro");
    }
  } else if (["rm"].includes(verb)) {
    use_memory(obj);
  } else if (["help", "h"].includes(verb)) {
    printHelp();
    if(room.short_description == "introduction") {
      move_to_room("help_intro");
    }
  } else if (["look"].includes(verb)) {
    look();
  } else if (["examine"].includes(verb)) {
    examine();
  } else if (["take", "pickup", "t", "grab", "g"].includes(verb)) {
    take_item(obj);
  } else if (["use", "try", "apply"].includes(verb)) {
    use_item(obj);
  } else if(room.short_description == "introduction" && (verb != "wait" || (verb != "help"))) { //if anything other than help or wait
    move_to_room("secret_intro");
  }
}

/***********************************MOVEMENT FUNCTIONS***************************************/
//move to room
function move_to_room(room_name) {
  console.log(room_name);
  character.location = room_name;
  room = waitDungeon[room_name];
  printDescription(room);
}

var waits = 0;
var stops = 0; 
var door = 0;
var dont_door = 0; 
var move_loop = 0; 
var memory_move = 0; 

function move(verb) {
  let direction = long_direction(verb);

  if(room.short_description == "memory_intro") {
    memory_move++;
  }

  // special cases for movement
  if((room.short_description == "introduction") && (direction != "wait")) { //if anything other than help or wait
    move_to_room("secret_intro");
  }
  
  if((room.short_description == "move_intro") && (verb == "left" || verb == "right" || verb == "forward" || verb == "back")) {
    move_introLoop(verb);
  }
  else if ((room.short_description == "memory_intro") && (verb == "left" || verb == "right" || verb == "forward" || verb == "back") && (memory_move > 0)) {
    move_introLoop(verb);
  }
  else if(room.short_description == "secret_intro") {
    move_to_room("waiting_here")
  }
  // general case for move
  else if (room.exits[direction]) {
    move_to_room(room.exits[direction]);
  } 
  //not recognized input
  else {
    print("Unaccepted input");
  }

  //check for memories
}

function move_introLoop(verb){

  if(move_loop == 0) {
    print("You're a little persistent huh? Okay, well, you move " + verb + " but there's still no where to go.");
  }
  else if(move_loop == 1) {
    print("Um, are you sure you want to do this? I'm not lying. It's an introduction, there really is no where to go. You move " + verb + ".");
  }
  else if(move_loop == 2) {
    print("Seriously. You can stop now. There's no need to move " + verb + "! You can just wait around, that's kind of the name of the game.");
  }
  else {
    print(".....you move " + verb + ".")
  }

  //if for some crazy reason
  if(move_loop == 10) {
    print("All right well if you won't wait, I guess I'll just have to make you. <i>Enjoy.</i>");
    move_to_room("waiting_here")
  }

  move_loop++; 

}
function waitLoop() {

  waits++;
}

function stopLoop() {

  stops++;
}

function doorLoop() {

  door++;
}

function doorDontLoop() {

  dont_door++; 
}

room = waitDungeon[character.location];
printDescription(room);

function look() {
  if(room.short_description == "introduction") {
    print("You're getting a little ahead of yourself, don't you think? It's only the introduction there's nothing to see.");
  }
  if(room.short_description == "help_intro" || (room.short_description == "move_intro") || (room.short_description == "memory_intro")) {
    print("Great job testing the look command, unfortunately this is only the introduction so there's nothing to see.");
  }
}

function examine() {
  if(room.short_description == "introduction") {
    print("You peer a little closer to the screen suspecting that there has to be something interesting. When right clicking to inspect the source code, you notice a secret input for the introduction.");
  }
  if(room.short_description == "help_intro" || (room.short_description == "move_intro") || (room.short_description == "memory_intro")) {
    print("You peer a little closer to the screen suspecting that there has to be something interesting. When right clicking to inspect the source code, you notice a secret input for the introduction.");
  }
}

/***********************************PRINT FUNCTIONS***************************************/

function printHelp() { //FIX: add touch, grab and bag later
    const help = `<b>Help:</b>
    <br>
    [<i><b>Look:</b> Allows you to look at the current area</i><br>
      <i><b>Examine:</b> Allows you to examine an object in an area more closely</i><br>
       <i><b>Forward:</b> Allows you to move forward through This Place</i><br>
       <i><b>Back:</b> Allows you to move back through This Place</i><br>
       <i><b>Left:</b> Allows you to move left through This Place</i><br>
       <i><b>Right:</b> Allows you to move right through This Place</i><br>
       <i><b>Memory:</b> Allows you to remember memories you’ve gained. An action that you must take alone.</i><br>
       <i><b>Remember (memory):</b> Recall the core memories you’ve collected]</i><br>
    <br>`;
    print(help);
}

function printInventory() {
  if(character.inventory.size > 0) {
    print("You are carrying:");
    character.inventory.forEach(function(item) {
      print("&nbsp;&nbsp;&nbsp;&nbsp;" + item);
    });
  }
  else {
    print("You aren't carrying anything.");
  }

}

function printMemories() {
  if(character.memories.length === 0) {
    print("<br><b>Memories:</b><br> You have the following memories:");
    print("&nbsp;&nbsp;&nbsp;&nbsp;" + "<b>You have no memories.</b>");
  }
  else {
    print("<br><b>Memories:</b><br> You have the following memories:");
    character.memories.forEach(function(memory) {
      print("&nbsp;&nbsp;&nbsp;&nbsp;" + memory);
    });
  }
}

function printDescription(room, force) {
  //print room description
  print(room.long_description);

  /*var exits = Object.keys(room.exits);
  if (exits.length > 1) {
    var last_exit = exits.pop();
    print("There are exits to the " + exits.join(", ") + " and " + last_exit);
  } else{
    print("There is an exit to the " + exits[0]);
  }
  room.contents.forEach(function(item) {
    print("There is a " + item + " here");
  });*/
}

/***********************************ITEM FUNCTIONS***************************************/
function take_item(obj) {
  if (obj === "all") {
    if (room.contents) {
      // this part: [:] makes a copy of the list so removing items works
      while (room.contents.length) {
        let item = room.contents.pop();
        print("You pick up the " + item);
        character.inventory.push(item);
      }
    } else {
      print("There is nothing to take!");
    }
  } else {
    let found = false;
    room.contents.forEach(function(item) {
      if (item.includes(obj)) {
        // does the word in obj match any part of the text of item?
        found = true;
        print("You pick up the " + item);
        character.inventory.push(item);
        remove(room.contents, item);
      }
    });
    if (!found) {
      print("There is nothing to take!");
    }
  }
}

//Remove item from inventory
function remove(array, item) {
  var idx = array.indexOf(item);
  if (idx > -1) {
    array.splice(idx, 1);
  }
}

function item_from(arr, obj) {
  for (let idx in arr) {
    let thing = arr[idx];
    console.log("is a %s a %s?", thing, obj);
    if (thing.includes(obj)) {
      return thing;
    }
  }
  return null;
}


function use_item(obj) {
  let item = item_from(character.inventory, obj);
  if (!item) {
    print("You aren't carrying a " + obj);
    return;
  }
}

/***********************************MEMORY FUNCTIONS***************************************/
function gain_memory(obj) {
  if(character.memories.includes(obj)) {
    return;
  }
  room.contents.forEach(function(memory) {
    if (memory.includes(obj)) {
      // does the word in obj match any part of the text of item?
      found = true;
      print("New Memory Unlocked " + memory);
      character.memories.push(memory);
      remove(room.contents, memory);
    }
  });

}

function use_memory(obj) {
  let memory = item_from(character.memories, obj);
  if (!memory) {
    print("You do not have this memory.");
    return;
  }
  else if (obj === "") {
    print("Please specify a memory, like: <i>rm existence</i>");
    return;
  }
  else {
    if(memory == "introductions") {
      print("<b>Introductions:</b> Congrats, you've remembered a memory!...it's um, this memory...now. You know, the one when you decided to " + 
      "click on this website to play a game that you are currently avoding playing. Are you scared? It's really not that scary, I promise!....Or are you " + 
      "just the type that enjoys picking apart games and trying to find bugs?");
    
    }
  }
}


