const textContainer = document.createElement("div");

// Set the content of the div (text to be displayed)
textContainer.textContent = "I'm listening";
// Set other attributes and styles as needed
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



// Append the div element to the body or another container
document.body.appendChild(textContainer);



const button = document.createElement("button");
button.id = "speechToTextButton";
button.textContent = "🎙️";
button.style.position = "fixed";
button.style.top = "70px";
button.style.right = "20px";
button.style.zIndex = "10000";
button.style.background = "#000";
button.style.color = "#fff";
button.style.border = "none";
button.style.width = "80px";
button.style.height = "80px";
button.style.fontSize = "25px";
button.style.cursor = "pointer";
document.body.appendChild(button);
button.style.display = "none";
console.log("buttoncreated");










let activeElement;
// Start or stop speech recognition
button.addEventListener("mousedown", (event) => {
    // Save the currently active element in mousedown
    activeElement = document.activeElement;
});
button.addEventListener("click", (e) => {
    // chrome.runtime.sendMessage({ command: "toggleRecognition" });
    // e.preventDefault();
    //if (activeElement) activeElement.focus();
    toggleRecognition();
});

function insertTextAtCursor(text) {
    textContainer.textContent = text;
    console.log(text);
    //converting to lowerCase for easier matching
        text = text.toLowerCase();

    //checks for the desired keywords
    if (text.includes("one")||text.includes("1")) {
        let option1 = document.querySelector("[data-testid='option-1']");
        option1.click();
    }
    //checks also for to
    else if (text.includes("two")||text.includes("2")||
        text.includes("to")) {
        let option2 = document.querySelector("[data-testid='option-2']");
        option2.click();
    }

    else if (text.includes("three")||text.includes("3")) {
        let option3 = document.querySelector("[data-testid='option-3']");
        option3.click();
    }

    else if (text.includes("four")||text.includes("4")) {
        let option4 = document.querySelector("[data-testid='option-4']");
        option4.click();
    }
    else if (text.includes("four")||text.includes("4")) {
        let option4 = document.querySelector("[data-testid='option-4']");
        option4.click();
    }
    else if (text.includes("back")||text.includes("previous")) {

        let back = document.querySelector('[aria-label="Press this to study the previous card"]');
        back.click();
        console.log("backButtonClicked");

    }

    //continue or next for easy usablility,
    else if (text.includes("continue")||text.includes("next")) {
        let continueButton = document.querySelector('[aria-label="Continue"]');
        if (continueButton){
            console.log("normalNext");
        } else {
            console.log("flashCardFlip");
            let continueButton = document.querySelector('[aria-label="Press this to study the next card"]');
            continueButton.click();
        }
        continueButton.click();
    }

    else if (text.includes("flip")){
        let continueButton = document.querySelector('div.o11g6ed5');
        continueButton.click();
    }

    const el = document.activeElement;
    const tagName = el.tagName.toLowerCase();

    if (tagName === "input" || tagName === "textarea") {
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const value = el.value;

        el.value = value.slice(0, start) + text + value.slice(end);
        el.selectionStart = el.selectionEnd = start + text.length;
    } else if (
        tagName === "div" &&
        el.getAttribute("contenteditable") === "true"
    ) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    // Make sure to trigger the website's own input listening events
    const inputEvent = new Event("input", { bubbles: true, cancelable: true });
    el.dispatchEvent(inputEvent);
    const changeEvent = new Event("change", {
        bubbles: true,
        cancelable: true,
    });
    el.dispatchEvent(changeEvent);
}

if (!window.recognition) {
    window.recognition = new webkitSpeechRecognition();
}
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

recognition.onresult = (event) => {
    console.log("end");

    const transcript = event.results[event.results.length - 1][0].transcript;
    // Stop ends the recording
    if (transcript.toLowerCase().includes("stop")) {
        toggleRecognition();
        textContainer.textContent = "I'm ready again";
        return;
    }
    insertTextAtCursor(transcript);
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

    console.log("toggle");
    if (!recognition.manualStop) {
        recognition.manualStop = true;
        recognition.stop();
        textContainer.style.display = "none";
        button.style.background = "#000";
    } else {
        recognition.manualStop = false;
        recognition.start();
        textContainer.style.display = "flex";
        button.style.background = "#f00";
    }
}
