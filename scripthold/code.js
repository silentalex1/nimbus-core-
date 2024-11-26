
const correctPassword = "Adminonly";


const passwordPrompt = document.getElementById("password-prompt");
const protectedContent = document.getElementById("protected-content");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit-password");
const errorMessage = document.getElementById("error-message");
const contentText = document.getElementById("content-text");


const descriptionText = `
-- Simple Fly Script
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local flying = false
local speed = 50

-- Toggle fly on 'F' key
game:GetService("UserInputService").InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.F then
        flying = not flying
        if flying then
            humanoid.PlatformStand = true
        else
            humanoid.PlatformStand = false
        end
    end
end)

-- Movement handler
local bodyVelocity = Instance.new("BodyVelocity")
bodyVelocity.MaxForce = Vector3.new(1e5, 1e5, 1e5)
local bodyGyro = Instance.new("BodyGyro")
bodyGyro.MaxTorque = Vector3.new(1e5, 1e5, 1e5)

game:GetService("RunService").RenderStepped:Connect(function()
    if flying then
        bodyVelocity.Velocity = Vector3.zero
        bodyGyro.CFrame = workspace.CurrentCamera.CFrame
        bodyVelocity.Parent = character.PrimaryPart
        bodyGyro.Parent = character.PrimaryPart

        local camera = workspace.CurrentCamera
        local moveDirection = Vector3.new(0, 0, 0)

        if game:GetService("UserInputService"):IsKeyDown(Enum.KeyCode.W) then
            moveDirection += camera.CFrame.LookVector
        end
        if game:GetService("UserInputService"):IsKeyDown(Enum.KeyCode.S) then
            moveDirection -= camera.CFrame.LookVector
        end
        if game:GetService("UserInputService"):IsKeyDown(Enum.KeyCode.A) then
            moveDirection -= camera.CFrame.RightVector
        end
        if game:GetService("UserInputService"):IsKeyDown(Enum.KeyCode.D) then
            moveDirection += camera.CFrame.RightVector
        end

        bodyVelocity.Velocity = moveDirection.Unit * speed
    else
        bodyVelocity:Destroy()
        bodyGyro:Destroy()
    end
end)
`;


document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});
document.addEventListener("contextmenu", (event) => event.preventDefault());
window.onbeforeunload = () => "Refreshing will reset the password check.";


const checkPassword = () => {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === correctPassword) {
        passwordPrompt.style.display = "none";
        protectedContent.style.display = "block";
        contentText.value = descriptionText; 
    } else {
        errorMessage.style.display = "block";
    }
};


submitButton.addEventListener("click", checkPassword);


passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPassword();
    }
});
