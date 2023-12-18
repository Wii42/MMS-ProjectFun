# Quassel Prototype

Based on: https://github.com/SkyJinXX/speech-to-text-extension


This Chrome extension allows you to control Quizlet with voicecommands:
1,2,3,4 for Answers
Next&Continue for next Question
Back for Flashcard before
Stop for stopping recoding

## Features
* Click the extension icon or press Alt+U, to toggle speech recognition on and off.
* Microphone icon in the upper-right corner of the web page for easy access, which also displays the current status of speech recognition (red when active, black when inactive).
* Continuous speech recognition mode that restarts automatically when it stops.
* "That's All" keyword: When you say "That's all" (regardless of case), the extension will automatically submit the input (equivalent to pressing Enter).
* Supports English language input.
## Installation
1. Download or clone this repository to your local machine.

2. Open the Chrome browser, and navigate to chrome://extensions/.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click the "Load unpacked" button, and select the directory containing the downloaded or cloned repository.

5. The extension should now appear in your list of installed extensions, and its icon should be visible in the browser toolbar.

## Usage
1. Click the extension icon or press Alt+U, to start speech recognition, or click the microphone icon in the lower-right corner of the web page.
2. Speak into your microphone. The extension will convert your speech into the coresponding button to press.
3. Saying "Stop" will stop the speech recognition.
4. To stop speech recognition without submitting, click the extension icon or press Alt+, again, or click the microphone icon.

## Limitations
* The extension relies on the Web Speech API, which might not be available in all browsers or environments.

## Bugs
On start, sometimes you have to say the word again.
Pressing on the Button in the Searchbar will not reset Textbox
