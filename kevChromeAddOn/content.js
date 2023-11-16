/**
 * textContainer is used to display the user input
 *
 * button is used to toggle the speech recognition
 *
 * Technical TODOs
 * TODO bug, that you can call next only twice
 * TODO bug, not recognizing the first word
 * TODO bug, fast clicking the togglebutton causes layout misshape
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

//Displays the user text
const textContainer = document.createElement("textBox");
textContainer.textContent = "I'm listening...";
textContainer.setAttribute("id", "displayText");
textContainer.style.position = "fixed";
textContainer.style.top = "70px";
textContainer.style.right = "100px";
textContainer.style.zIndex = "10000";
textContainer.style.background = "#000";
textContainer.style.color = "#fff";
textContainer.style.fontSize = "25px";
textContainer.style.cursor = "pointer";
textContainer.style.width = "300px";
textContainer.style.height = "80px";
textContainer.style.alignItems = "center";
textContainer.style.justifyContent = "center";
textContainer.style.display = "none";
document.body.appendChild(textContainer);


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



//Microphone button
const button = document.createElement("button");
button.id = "speechToTextButton";
button.textContent = "🎙️";
button.style.position = "fixed";
button.style.top = "70px";
button.style.right = "20px";
button.style.zIndex = "10000";
button.style.border = "none";
button.style.width = "80px";
button.style.height = "80px";
button.style.fontSize = "25px";
button.style.cursor = "pointer";
button.style.display = "none";
document.body.appendChild(button);

function buttonStyleMuted(){
    button.style.borderRadius = "120px";
    button.style.background = "AliceBlue";
}
function buttonStyleNotMuted() {
    button.style.borderRadius = "0";
    button.style.background = "#f00";
}


/**
 * Toggles the Design of the buttons, depending on if the mic is muted or not
 */
function toggleButtons(){
    //toggle between round and square shape of the button, uses the radius of the button to check
    if (button.style.borderRadius === "120px"){
        buttonStyleNotMuted();
        textBoxStyleNotMuted();

    } else{
        buttonStyleMuted();
        textBoxStyleWhenMuted();
    }

    //On toggle the textContainer displays default message
    updateTextBoxText("I'm listening...");
}




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

/**
 * Checks if there are any of the keywords in the text and presses the specific buttons
 *
 * @param text
 */

function pressButtons(text){
    function notAndOption (userInput){
        text = text + " is not an option at the moment";
        textContainer.textContent = text;
    }


    //debug log
    console.log(text);

    text = text.toLowerCase();
    //checks for the desired keywords
    if (text.includes("one")||text.includes("1")) {
        let option1 = document.querySelector("[data-testid='option-1']");
        if (option1) {text = "one";
        option1.click();}
        else notAndOption(text);
    }
    //checks also for to
    else if (text.includes("two")||text.includes("2")||
        text.includes("to")) {
        let option2 = document.querySelector("[data-testid='option-2']");
        if (option2) {text = "two";
            option2.click();}
        else notAndOption(text);

    }
    else if (text.includes("three")||text.includes("3")) {
        let option3 = document.querySelector("[data-testid='option-3']");
        if (option3) {text = "three";
            option3.click();}
        else notAndOption(text);
    }
    else if (text.includes("four")||text.includes("four")||text.includes("4")) {
        let option4 = document.querySelector("[data-testid='option-4']");
        if (option4) {text = "four";
            option4.click();}
        else notAndOption(text);
    }
    else if (text.includes("back")||text.includes("previous")) {
        let back = document.querySelector('[aria-label="Press this to study the previous card"]');
        back.click();
    }
    //continue or next for easy usability, TODO Fix bug, that you can do next only twice in a row
    else if (text.includes("continue")||text.includes("next")) {
        let continueButton = document.querySelector('[aria-label="Continue"]');
        if (!continueButton){
            continueButton = document.querySelector('[aria-label="Press this to study the next card"]');
        }
        if (!continueButton) {
            text = text + " is not an option at the moment";
        } else continueButton.click();
    }
    //flips the flashcard
    else if (text.includes("flip")){
        let continueButton = document.querySelector('div.o11g6ed5');
        continueButton.click();
    }


    else {
        text = "I'm sorry, what do you mean by: " + text + "?";
        updateTextBoxText(text);
        return;
    }

    //update textContainer to corresponding text
    textContainer.textContent = text;

}




// Stop ends the recording
recognition.onresult = (event) => {
    console.log("end");

    const transcript = event.results[event.results.length - 1][0].transcript;

    if (transcript.toLowerCase().includes("stop")) {
        toggleRecognition();
        return;
    }
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
        }, 100);
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
