const config = 
{
    "url": "https://api.recursionist.io/builder/computers",
    "btnId": "simulate",
    "target": "result"
};

let states =
{
    "gpu": {
        "brand": false,
        "model": false,
    },
    "cpu": {
        "brand": false,
        "model": false,
    },
    "memory": {
        "slots": false,
        "brand": false,
        "model": false,
    },
    "storage": {
        "hdd-sdd": false,
        "size": false,
        "brand": false,
        "model": false,
    },
}

let btn = document.getElementById(config.btnId);
btn.addEventListener("click", function() {
    let newUrl = config.url + '?type=gpu';
    fetch(newUrl)
    .then(res => res.json())
    .then(data => document.getElementById(config.target).innerHTML = JSON.stringify(data));
});


/**
 * 
 * @param {string} value
 * 
 * REQUIRES: value is string which represents the value of a dropdown item
 * MODIFIES: GPU button
 * EFFECTS: called when a dropdown item is selected, overwriting the text in the button to the value of an item. 
 */
function handleDropdown(component, type, next, value) {
    let btnName = component + '-' + type + "-btn";
    let btn = document.getElementById(btnName);
    btn.innerHTML = value;
    states[component][type] = true;

    if (next) {
        generateDropdown(component, type, next);
    }

    if (isSelected(component)) {
        let current = document.getElementById(component + "-select");
        let next = document.getElementById(current.dataset.next);
        next.classList.remove("d-none");
        next.classList.add("slide-in");
        
    }
}

function generateDropdown(component, type, next) {
    console.log("made it here");
}

function isSelected(component) {
    let componentState = states[component];
    for (state in componentState) {
        if(!componentState[state]) return false;
    }

    return true;
}