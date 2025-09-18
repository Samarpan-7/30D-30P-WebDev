const chat = document.getElementById("_chat");
const jokeBtn = document.getElementById("jokeBtn");

// Initial joke load
generateJoke();

jokeBtn.addEventListener("click", generateJoke);

async function generateJoke() {
    jokeBtn.disabled = true;

    // User message
    const userMsg = createMessageElement("Hey Robot, tell me a Joke?", "response");
    appendMessage(userMsg);

    // Loading message
    const loadingMsg = createMessageElement('<i class="fa-solid fa-ellipsis"></i>', "joke");
    appendMessage(loadingMsg);

    try {
        const res = await fetch("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
        });

        if (res.ok) {
            const data = await res.json();
            setElementContent(loadingMsg, data.joke);
        } else {
            setElementContent(loadingMsg, "Oops! Couldn't fetch a joke right now.");
        }
    } catch (error) {
        setElementContent(loadingMsg, "Error fetching joke 😢");
    }

    jokeBtn.disabled = false;
}

// ✅ Create message element
function createMessageElement(content, type) {
    const element = document.createElement("div");
    element.classList.add("message");
    element.classList.add(type); // "joke" or "response"
    setElementContent(element, content);
    return element;
}

// ✅ Append message to chat
function appendMessage(element) {
    chat.appendChild(element);
    chat.scrollTop = chat.scrollHeight; // auto-scroll
}

// ✅ Set content
function setElementContent(element, content) {
    element.innerHTML = content;
}

