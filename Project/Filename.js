const input = document.getElementById("file")
const text = document.getElementById("file-text");

function UpdateName() {
    const file = input.files[0]
    if (file) {
        text.textContent = file.name;
    } else {
        text.textContent = 'Choose File';
    }
}

input.addEventListener("change", UpdateName)