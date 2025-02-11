const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    content.textContent = "Listening...";
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    content.textContent = transcript;
    replyToUser(transcript);
};

// Function to Speak with a Female Voice
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    
    // Select Female Voice
    const voices = speechSynthesis.getVoices();
    speech.voice = voices.find(voice => voice.name.includes("Female")) || voices[0];

    window.speechSynthesis.speak(speech);
}

// Custom Greetings & Replies
function replyToUser(message) {
    let response = "I did not understand sir.";
    
    if (message.includes("hello") || message.includes("hi")) {
        response = "Hello Sir, the Mark 42 is not combat-ready.";
    } else if (message.includes("how are you")) {
        response = "I am an Jarvis, It appears that the suit can take the weight of the additional modifications..";
    } else if (message.includes("who are you")) {
        response = "I am JARVIS, your personal artificial intelligence assistant.";
    } else if (message.includes("what is the time")) {
        const time = new Date().toLocaleTimeString();
        response = `The current time is ${time}`;
    } else if (message.includes("thank you")) {
        response = "You're welcome, sir";
    }
    
    speak(response);
}

// Button Click to Start Recognition
btn.addEventListener('click', () => {
    recognition.start();
});
