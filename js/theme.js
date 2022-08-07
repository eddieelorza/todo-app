const toggleButton = document.getElementById('toggle-button')
const theme = window.localStorage.getItem("theme");


if (theme == "dark") {
    document.body.classList.add("dark");
    toggleButton.classList.add("dark");
}


toggleButton.addEventListener('click', function () {
    document.body.classList.toggle("dark");
    if (theme == "dark") {
        window.localStorage.setItem("theme", "light");
        toggleButton.classList.remove("dark");
    } else {
        window.localStorage.setItem("theme", "dark");
        toggleButton.classList.add("dark");
    }
}
);


// Language: javascript


