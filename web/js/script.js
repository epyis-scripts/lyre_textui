// Wait for the window to load before executing the script
window.addEventListener("load", function () {
    // Get the instructions container element by its ID
    const instructionsContainer = document.getElementById("textui-container");
    const textUIs = {}; // To store the text UIs
    let containerHeight = 0;

    // Listen for messages from other parts of the application
    window.addEventListener("message", function (event) {
        const data = event.data;

        if (data.type === "addTextUI") {
            const textUI = data.detail;
            if (textUI && textUI.identifier) {
                // Create a new Text UI element
                const textUIElement = document.createElement("div");
                textUIElement.className = "textui";
                textUIElement.setAttribute("data-textui-identifier", textUI.identifier);

                if (textUI.type === "text") {
                    textUIElement.innerHTML = textUI.content.text;
                } else if (textUI.type === "keyboard") {
                    const keyElement = document.createElement("div");
                    keyElement.classList.add("key");
                    keyElement.textContent = textUI.content.keyboard;

                    textUIElement.appendChild(keyElement);
                    textUIElement.innerHTML += textUI.content.text;
                } else if (textUI.type === "progress") {
                    const progressBar = document.createElement("div");
                    progressBar.className = "progress-bar";
                    progressBar.setAttribute("data-textui-identifier", textUI.identifier);

                    // Create the progress bar background (unfilled part)
                    const progressBarBackground = document.createElement("div");
                    progressBarBackground.className = "progress-background";
                    progressBar.appendChild(progressBarBackground);

                    // Create the progress bar element and set its width based on the current value
                    const progressBarFill = document.createElement("div");
                    progressBarFill.className = "progress-bar-fill";
                    const percent = ((textUI.content.current - textUI.content.min) / (textUI.content.max - textUI.content.min)) * 100;
                    progressBarFill.style.width = `${percent}%`;
                    progressBar.appendChild(progressBarFill);

                    // Create the text element if text is not null or empty
                    if (textUI.content.text && textUI.content.text.trim() !== "") {
                        const textElement = document.createElement("div");
                        textElement.className = "progress-text";
                        textElement.innerHTML = textUI.content.text;

                        progressBar.appendChild(textElement);
                    } else {
                        progressBarBackground.classList.add("no-text");
                        progressBarFill.classList.add("no-text");
                    }

                    // Add the progress bar to the container
                    textUIElement.appendChild(progressBar);
                }

                // Add element to the container
                instructionsContainer.appendChild(textUIElement);

                // Store the textUI in the textUIs object
                textUIs[textUI.identifier] = textUI;

                // Calculate the container height
                containerHeight += textUIElement.offsetHeight + 5;

                // Update the container height
                instructionsContainer.style.height = containerHeight + 5 + "px";

                setTimeout(() => {
                    textUIElement.classList.add("visible");
                }, 10); // A little wait to wait for DOM render
            }
        } else if (data.type === "removeTextUI") {
            const identifier = data.detail;
            const textUIElement = instructionsContainer.querySelector(`[data-textui-identifier="${identifier}"]`);
            if (textUIElement && textUIElement.parentNode === instructionsContainer) {
                containerHeight -= textUIElement.offsetHeight + 5;

                // Check if the item still exists in the container
                textUIElement.classList.remove("visible");

                // Wait for the animation to finish before deleting the element
                textUIElement.addEventListener("transitionend", function () {
                    if (textUIElement.parentNode === instructionsContainer) {
                        // Check again if the item is still in the container
                        instructionsContainer.removeChild(textUIElement);
                    }
                });

                // Update the container height
                setTimeout(() => {
                    instructionsContainer.style.height = containerHeight + 5 + "px";
                }, 500);
            }
        } else if (data.type === "setStyleArgs") {
            const newStyleArgs = data.args;
            const identifier = data.identifier;
            const textUIElement = instructionsContainer.querySelector(`[data-textui-identifier="${identifier}"]`);
            const classes = textUIElement.classList;
            if (textUIElement && textUIElement.parentNode === instructionsContainer) {
                classes.forEach(function (className) {
                    if (className.startsWith("arg-")) {
                        textUIElement.classList.remove(className);
                    }
                });
                newStyleArgs.forEach(function (styleArg) {
                    textUIElement.classList.add("arg-" + styleArg);
                });
            }
        } else if (data.type === "editTextUI") {
            const textUI = data.detail;
            if (textUI && textUI.identifier) {
                // Search for the textUI by identifier
                const textUIElement = instructionsContainer.querySelector(`[data-textui-identifier="${textUI.identifier}"]`);

                if (textUIElement) {
                    // Update the textUI content
                    if (textUI.type === "text") {
                        textUIElement.innerHTML = textUI.content.text;
                    } else if (textUI.type === "keyboard") {
                        const keyElement = textUIElement.querySelector(".key");
                        if (keyElement) {
                            keyElement.textContent = textUI.content.keyboard;
                        }
                        const textElement = textUIElement.querySelector(".progress-text");
                        if (textElement) {
                            textElement.innerHTML = textUI.content.text;
                        }
                    } else if (textUI.type === "progress") {
                        // Update progress bar
                        const progressBarFill = textUIElement.querySelector(".progress-bar-fill");
                        const progressBarBackground = textUIElement.querySelector(".progress-background");
                        if (progressBarFill) {
                            const percent = ((textUI.content.current - textUI.content.min) / (textUI.content.max - textUI.content.min)) * 100;
                            progressBarFill.style.width = `${percent}%`;
                        }

                        // Update progress bar text
                        const textElement = textUIElement.querySelector(".progress-text");
                        if (textElement) {
                            if (textUI.content.text && textUI.content.text.trim() !== "") {
                                textElement.style.display = "block";
                                textElement.innerHTML = textUI.content.text;
                                progressBarBackground.classList.remove("no-text");
                                progressBarFill.classList.remove("no-text");
                            } else {
                                // If text content is empty, hide text and add no-text class to the progress bar
                                textElement.style.display = "none";
                                progressBarBackground.classList.add("no-text");
                                progressBarFill.classList.add("no-text");
                            }
                        }
                    }
                }
            }
        } else if (data.type === "showui") {
            // Show the instructions container with animation
            instructionsContainer.style.opacity = "1";
            instructionsContainer.style.transform = "translate(0, -50%) scale(1)";
        } else if (data.type === "hideui") {
            // Hide the instructions container with animation
            instructionsContainer.style.opacity = "0";
            instructionsContainer.style.transform = "translate(0, -50%) scale(0)";
        }
    });
});