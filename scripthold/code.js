
const correctPassword = "Adminonly";


const passwordPrompt = document.getElementById("password-prompt");
const protectedContent = document.getElementById("protected-content");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit-password");
const errorMessage = document.getElementById("error-message");


document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});
document.addEventListener("contextmenu", (event) => event.preventDefault());
window.onbeforeunload = () => "Refreshing will reset the password check.";


submitButton.addEventListener("click", () => {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === correctPassword) {
        passwordPrompt.style.display = "none";
        protectedContent.style.display = "block";
    } else {
        errorMessage.style.display = "block";
    }
});
