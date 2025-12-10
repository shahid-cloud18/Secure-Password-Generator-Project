let lengthSlider = document.getElementById('lengthSlider')
let sliderValue = document.getElementById('sliderValue')

sliderValue.textContent = lengthSlider.value

lengthSlider.addEventListener("input", ()=>{
    sliderValue.textContent = lengthSlider.value
})

let checkboxes = document.querySelectorAll('.checkbox')

Array.from(checkboxes).forEach(Element=>{
    Element.addEventListener('click',(e)=>{
        if(e.target.innerText == 'radio_button_unchecked'){
            e.target.innerText = 'task_alt'
            e.target.nextElementSibling.nextElementSibling.checked = true
        }
        else{
            e.target.innerText = 'radio_button_unchecked'
            e.target.nextElementSibling.nextElementSibling.checked = false
        }
    })
})
let includeLabels = document.querySelectorAll('.row label')

Array.from(includeLabels).forEach(Element=>{
    Element.addEventListener('click',(e)=>{
        if(e.target.previousElementSibling.innerText == 'radio_button_unchecked'){
            e.target.previousElementSibling.innerText = 'task_alt'
        }
        else{
            e.target.previousElementSibling.innerText = 'radio_button_unchecked'
        }
    })
})

let generateBtn = document.getElementById('generateBtn')
let password = document.getElementById('password')
let copyIcon = document.getElementById('copyIcon')

// Strength elements
let strengthBar = document.getElementById('strengthBar')
let strengthText = document.getElementById('strengthText')

generateBtn.addEventListener('click', function(){
    let length = lengthSlider.value

    let uppercase = document.getElementById('uppercase').checked
    let lowercase = document.getElementById('lowercase').checked
    let symbols = document.getElementById('symbols').checked
    let numbers = document.getElementById('numbers').checked

    let password_generated = generatePassword(length, uppercase, lowercase, symbols, numbers)
    password.value = password_generated

    // Check strength after generating
    checkPasswordStrength(password_generated)
})
    // Input Chararcters
function generatePassword(length, uppercase, lowercase, symbols, numbers){
    let charset = ""
    let string = ""

    if(uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if(symbols) charset += "!@#$%&_";
    if(numbers) charset += "0123456789";

    if(charset === ""){
        alert("Please select at least one option!");
        return "";
    }

    for(let i=0; i<length; i++){
        string += charset.charAt(Math.floor(Math.random()*charset.length))
    }
    return string;
}
// Password strength checker function
function checkPasswordStrength(passwordValue) {
    let strength = 0;

    if (passwordValue.length >= 8) strength++;
    if (/[A-Z]/.test(passwordValue)) strength++;
    if (/[a-z]/.test(passwordValue)) strength++;
    if (/[0-9]/.test(passwordValue)) strength++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) strength++;

    let color, width, label;
    switch (strength) {
        case 1:
            color = "#ff4b5c";
            width = "20%";
            label = "Very Weak 🔴";
            break;
        case 2:
            color = "#ff9800";
            width = "40%";
            label = "Weak 🟠";
            break;
        case 3:
            color = "#ffeb3b";
            width = "60%";
            label = "Medium 🟡";
            break;
        case 4:
            color = "#4caf50";
            width = "80%";
            label = "Strong 🟢";
            break;
        case 5:
            color = "#2e7d32";
            width = "100%";
            label = "Very Strong 💪";
            break;
        default:
            color = "#ddd";
            width = "0%";
            label = "-";
    }

    strengthBar.style.background = `linear-gradient(to right, ${color} ${width}, #ddd ${width})`;
    strengthText.textContent = `Strength: ${label}`;
}

// Copy to clipboard
copyIcon.addEventListener('click', ()=>{
    if(password.value !=""){
        navigator.clipboard.writeText(password.value)
        copyIcon.innerText = 'check'
        setTimeout(()=>{
            copyIcon.innerText='content_copy'
        }, 3000)
    }
})

// Live strength check while typing
password.addEventListener("input", (e) => {
    checkPasswordStrength(e.target.value);
});