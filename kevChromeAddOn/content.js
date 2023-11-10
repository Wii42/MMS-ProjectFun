const button = document.createElement("button");
button.id = "speechToTextButton";
button.textContent = "Quassel Pro 720 🎙️";
button.style.position = "fixed";
button.style.top = "70px";
button.style.right = "20px";
button.style.zIndex = "10000";
button.style.background = "#000";
button.style.color = "#fff";
button.style.border = "none";
button.style.width = "400px";
button.style.height = "120px";
button.style.fontSize = "24px";
button.style.cursor = "pointer";
button.style.display = "none";
document.body.appendChild(button);

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
    //debug log
    if (text.includes("one")||text.includes("1")) {
        let option1 = document.querySelector("[data-testid='option-1']");
        option1.click();
    }
    if (text.includes("two")||text.includes("2")) {
        let option2 = document.querySelector("[data-testid='option-2']");
        option2.click();
    }
    if (text.includes("three")||text.includes("3")) {
        let option3 = document.querySelector("[data-testid='option-3']");
        option3.click();
    }
    if (text.includes("four")||text.includes("4")) {
        let option4 = document.querySelector("[data-testid='option-4']");
        option4.click();
    }

    // const sectionToClick = document.getElementById("w1uwrq7e");
    // if (sectionToClick) {
    //     console.log("button 1 pressed");
    //     const clickEvent = new Event("customClick");
    //     sectionToClick.dispatchEvent(clickEvent);
    // }


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
    // Check if the send keyword is included
    if (transcript.toLowerCase().includes("that's all.")) {
        const el = document.activeElement;
        const e = new KeyboardEvent("keydown", {
            keyCode: 13,
            bubbles: true,
            cancelable: true,
        });

        el.dispatchEvent(e);
        toggleRecognition();

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
        button.style.background = "#000";
    } else {
        recognition.manualStop = false;
        recognition.start();
        button.style.background = "#f00";
    }
}
