// Default theme
let currentTheme = "heavy";

const themeConfig = {
    heavy: "heavy.css",
    simple_black: "simple_black.css",
    simple_white: "simple_white.css",
    lyre: "lyre.css",
    void: "void.css",
};

// Function to change the theme
function changeTheme(newTheme) {
    if (themeConfig[newTheme]) {
        // Change link to the new css file
        const themeCSSLink = document.getElementById("theme-css");
        themeCSSLink.href = "css/" + themeConfig[newTheme];
        currentTheme = newTheme;
    }
}