/**
 * textContainer is used to display the user input
 *
 * button is used to toggle the speech recognition
 *
 * Technical TODOs
 * TODO bug, that you can call next only twice
 * TODO bug, not recognizing the first word
 * TODO add Logo
 * TODO fix that text is bigger then textBox
 *
 * Program Design TODOs
 * TODO difference between user and program text
 * TODO how do users learn the program, maybe in description
 *
 *
 * @type {HTMLElement}
 */

//creates speech recognition object

if (!window.recognition) {
    window.recognition = new webkitSpeechRecognition();
}
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

//Microphone button
const button = document.createElement("button");
button.id = "speechToTextButton";
button.textContent = "🎙️";

button.style.position = "fixed";
button.style.top = "98px";
button.style.right = "25px";
button.style.zIndex = "10000";
button.style.border = "none";
button.style.width = "60px";
button.style.height = "60px";
button.style.fontSize = "25px";
button.style.cursor = "pointer";
button.style.display = "none";
document.body.appendChild(button);

//Displays the user text
const textContainer = document.createElement("textBox");
textContainer.textContent = "Quassel";
textContainer.style.fontSize = "16px";
textContainer.style.borderTopLeftRadius = "0.5rem";
textContainer.style.borderBottomLeftRadius = "0.5rem";
textContainer.setAttribute("id", "displayText");
textContainer.style.position = "fixed";
textContainer.style.top = "98px";
textContainer.style.right = "85px";
textContainer.style.zIndex = "10000";
textContainer.style.background = "#2e3856";
textContainer.style.color = "#f6f7fb";
textContainer.style.fontSize = "20px";
textContainer.style.cursor = "pointer";
textContainer.style.width = "175px";
textContainer.style.height = "60px";
textContainer.style.alignItems = "center";
textContainer.style.justifyContent = "center";
textContainer.style.display = "none";
textContainer.style.padding = "10px";
document.body.appendChild(textContainer);

const descriptionContainer = document.createElement("textBox");
let selectAnswer = "Select the correct answer by stating \'one\', \'two\', \'three\' or \'four\'";
descriptionContainer.textContent = selectAnswer;
descriptionContainer.style.borderRadius = "0.5rem";
descriptionContainer.setAttribute("id2", "displayText2");
descriptionContainer.style.position = "fixed";
descriptionContainer.style.top = "180px";
descriptionContainer.style.right = "25px";
descriptionContainer.style.zIndex = "9999";
descriptionContainer.style.background = "#2e3856";
descriptionContainer.style.color = "#f6f7fb";
descriptionContainer.style.fontSize = "16px";
descriptionContainer.style.cursor = "pointer";
descriptionContainer.style.width = "235px";
descriptionContainer.style.height = "auto";
descriptionContainer.style.alignItems = "center";
descriptionContainer.style.justifyContent = "start";
descriptionContainer.style.display = "none";
descriptionContainer.style.padding = "10px";
document.body.appendChild(descriptionContainer);

function buttonStyleMuted(){
    button.style.borderRadius = "120px";
    button.style.background = "AliceBlue";
}
function buttonStyleNotMuted() {
    button.style.borderRadius = "0";
    button.style.background = "#b00020";
    button.style.borderTopRightRadius = "0.5rem";
    button.style.borderBottomRightRadius = "0.5rem";
}

function updateTextBoxText (newText){
    textContainer.textContent = newText;
}
function textBoxStyleWhenMuted(){
    //Hides the textBox
    textContainer.style.display = "none";
}
function textBoxStyleNotMuted(){
    textContainer.style.display = "none";
    textContainer.style.display = "flex";
}

function updateDescriptionBoxText (newText){
    descriptionContainer.textContent = newText;
}
function descriptionBoxStyleWhenMuted(){
    //Hides the textBox
    descriptionContainer.style.display = "none";
}

function descriptionBoxStyleNotMuted(){
    descriptionContainer.style.display = "none";
    descriptionContainer.style.display = "flex";
}
// TODO brauchen wir diese funktion ?
function showDescriptionBoxWhenContent(){
    let text = descriptionContainer.textContent;
    if (text !== null && text.trim() !== "") {
        descriptionContainer.style.display = "flex";
    }
}


/**
 * Toggles the Design of the buttons, depending on if the mic is muted or not
 */
function toggleButtons(){
    //toggle between round and square shape of the button, uses the radius of the button to check
    if (button.style.borderRadius === "120px"){
        buttonStyleNotMuted();
        textBoxStyleNotMuted();
        descriptionBoxStyleNotMuted();
        } else {
        buttonStyleMuted();
        textBoxStyleWhenMuted();
        descriptionBoxStyleWhenMuted();
    }
}


//displays a cat basic version
/*const cat = document.createElement("div");
cat.style.backgroundImage = "url('" + chrome.runtime.getURL('image/cat.png') + "')";
cat.style.backgroundSize = "cover";
cat.style.position = "absolute";
cat.style.display = "none";
cat.style.top = "400px";
cat.style.left = "20px";
cat.style.width = "360px";
cat.style.height = "360px";
document.body.appendChild(cat);*/

//creates the parent for all the cats
var catParent = document.createElement("div");
catParent.id = "cat";
var countTheCats = 0;
document.body.appendChild(catParent);

function makeSeveralCats(numberOfCats){
    for (let i = 0; i<numberOfCats;i++){
        makeACat();
    }
}

function makeACat(){
    countTheCats++;
    var cat = document.createElement("div");
    cat.style.backgroundImage = "url('" + chrome.runtime.getURL('image/cat.png') + "')";
    cat.style.backgroundSize = "cover";
    cat.style.position = "absolute";
    catParent.style.display = "block";
    cat.style.top = "400px";
    cat.style.left ="" + countTheCats*20 + "px";
    cat.style.width = "" + 100 * countTheCats*0.2+ "px";
    cat.style.height = "" + 100 * countTheCats*0.2+ "px";
    //adds the cat to the parent
    catParent.appendChild(cat);
}



/*
Additional Textbox as speech bubble

// Create the speech bubble div
var bubbleDiv = document.createElement("div");
bubbleDiv.style.zIndex = "9999";
bubbleDiv.style.position = "fixed";
bubbleDiv.style.top = "170px";
bubbleDiv.style.right = "20px";
bubbleDiv.style.width = "360px";
bubbleDiv.style.height = "100px";
bubbleDiv.style.backgroundColor = "#FFCC00";
bubbleDiv.style.border = "2px solid #999";
bubbleDiv.style.borderRadius = "10px";
bubbleDiv.style.padding = "10px";

// Create the speech bubble tail
var bubbleTail = document.createElement("div");
bubbleTail.style.position = "absolute";
bubbleTail.style.top = "-20px";
bubbleTail.style.right = "20px";
bubbleTail.style.borderLeft = "20px solid transparent";
bubbleTail.style.borderRight = "20px solid transparent";
bubbleTail.style.borderBottom = "20px solid #FFCC00";
bubbleDiv.appendChild(bubbleTail);

// Create the textarea
var textArea = document.createElement("textarea");
textArea.style.width = "100%";
textArea.style.height = "80%";
textArea.style.border = "none";
textArea.style.backgroundColor = "#FFCC00";
bubbleDiv.appendChild(textArea);

// Add the speech bubble to the body
document.body.appendChild(bubbleDiv);*/



/**
 * I do not understand this function
 * @kev
 */
let activeElement;
// Start or stop speech recognition
button.addEventListener("mousedown", (event) => {
    // Save the currently active element in mousedown
    activeElement = document.activeElement;
});

button.addEventListener("click", (e) => {
    // chrome.runtime.sendMessage({ command: "toggleRecognition" });
    e.preventDefault();
    toggleRecognition();
});

// deletes answer after 3 seconds
function deleteAnswer(){
    setTimeout(() => {
          updateTextBoxText("");}, 1000);
}


// check correct answer
function checkCorrectAnswer(){
    let continueButton = document.querySelector('[aria-label="Continue"]');
    if (continueButton) {
        updateDescriptionBoxText("state continue");
    } else {
        deleteAnswer();
        setTimeout(() => {
            updateDescriptionBoxText(selectAnswer);}, 1000);
    }
}
/**
 * Checks if there are any of the keywords in the text and presses the specific buttons
 *
 * @param text
 */


//used to restart after a double recognition
var lastWord = "";

let misheardWordsCounter = 0;

function pressButtons(text) {
    text = text.toLowerCase(); // Konvertiere den Text in Kleinbuchstaben

    // Funktion zur Anzeige einer Nachricht, wenn die Option nicht verfügbar ist
    function notAnOption() {
        textContainer.textContent = text + " is not an option at the moment";
    }

    // Überprüfung der verschiedenen Schlüsselwörter im Text
    if (text.includes("stop")) {
        toggleRecognition();
        return;
    } else if (text.includes("one") || text.includes("1")) {
        handleOptionSelection("[data-testid='option-1']", "one");
    } else if (text.includes("two") || text.includes("2") || text.includes("to")) {
        handleOptionSelection("[data-testid='option-2']", "two");
    } else if (text.includes("three") || text.includes("3")) {
        handleOptionSelection("[data-testid='option-3']", "three");
    } else if (text.includes("four") || text.includes("for") || text.includes("4")) {
        handleOptionSelection("[data-testid='option-4']", "four");
    } else if (text.includes("back") || text.includes("previous")) {
        document.querySelector('[aria-label="Press this to study the previous card"]').click();
    } else if (text.includes("continue") || text.includes("next")) {
        handleContinueOption();
    } else if (text.includes("flip")) {
        document.querySelector('div.o11g6ed5').click();
    } else if (text.includes("cat") || text.includes("cut")) {
        makeSeveralCats(8);
    } else if (text.includes("go away")) {
        catParent.style.display = "none";
    } else {
        handleDefaultCase();
        return;
    }
    updateUI(); // Aktualisiere die Benutzeroberfläche
    handleDuplicateWordRecognition();
}

// Funktion zur Handhabung der Auswahl einer Option
function handleOptionSelection(selector, optionText) {
    let continueButton = document.querySelector('[aria-label="Continue"]');
    let option = document.querySelector(selector);
    if (option && !continueButton) {
        option.click();
        text = optionText;
        setTimeout(() => {
            checkCorrectAnswer();}, 1000);
        } else if (option && continueButton){
            text = optionText;
            updateDescriptionBoxText("state continue");
    } else {
        notAnOption();
    }
}

// Funktion zur Handhabung der "Weiter"-Option
function handleContinueOption() {
    let continueButton = document.querySelector('[aria-label="Continue"]');
    if (!continueButton) {
        text = text + " is not an option at the moment";
    } else {
        continueButton.click();
        deleteAnswer();
        setTimeout(() => {
            updateDescriptionBoxText(selectAnswer);}, 1000);
    }
}

// Funktion zur Handhabung des Standardfalls
function handleDefaultCase() {
    if (text.length >= 20) {
        text = text.substring(0, 17) + "...";
    }
    let description = "I'm \n sorry, what do you mean by: " + text + "?";
    updateDescriptionBoxText(description);
    setTimeout(() => {
        description = " Select the correct answer by stating 'one', 'two', 'three', or 'four'";
        updateDescriptionBoxText(description);}, 4000);
    //updateTextBoxText(text);
    setTimeout(() => {
            updateTextBoxText("");}, 4000);
}

// Funktion zur Aktualisierung der Benutzeroberfläche
function updateUI() {
    textContainer.textContent = text;
    descriptionContainer.textContent = description;
    //showDescriptionBoxWhenContent();
}

// Funktion zur Überprüfung von Duplikaten im Text
function handleDuplicateWordRecognition() {
    if (text.includes(lastWord)) {
        recognition.stop();
    }
    lastWord = text;
}



recognition.onresult = (event) => {
    console.log("Event triggered");
    const transcript = event.results[event.results.length - 1][0].transcript;
    console.log(transcript);
    if (transcript.length!==0) {
        pressButtons(transcript);
    }
};

recognition.onend = () => {
    console.log("done");
    if (!recognition.manualStop) {
        setTimeout(() => {
            recognition.start();
            console.log("restarted");
        }, 10);
    }
};

chrome.runtime.onMessage.addListener((request) => {
    if (request.command === "toggleRecognition") {
        toggleRecognition();
    }
});


function toggleRecognition() {
    toggleButtons();
    console.log("toggle");
    if (!recognition.manualStop) {
        recognition.manualStop = true;
        recognition.stop();
    } else {
        recognition.manualStop = false;
        recognition.start();
    }
}
