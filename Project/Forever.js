const passwordContainer = document.getElementById('password-container');
const dropdown = document.getElementById("expiration");

function CheckPassword(){

    let value = dropdown.value;

    if(value == "forever"){
        // if the dropdown is set to forever, a text input will be created and the user has to write the daily password

        const input = document.createElement("input")
        input.type = "password"
        input.name = "password"
        input.placeholder = "Write password";
        input.id = "password"
        input.required = true;
    
        passwordContainer.appendChild(input);
    
        console.log("Password is required");
        alert(`To use the "forever" option, ask Magnus for password`);
    } 
    else {
        passwordContainer.innerHTML = "";
        console.log("Password is not required");
    }
}

dropdown.addEventListener("change", CheckPassword);