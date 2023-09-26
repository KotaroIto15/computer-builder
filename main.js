const config = 
{
    "url": "https://api.recursionist.io/builder/computers",
    "btnId": "simulate",
    "target": "result",
};

let states =
{
    "gpu": {
        "Brand": true,
        "Model": false,
    },
    "cpu": {
        "Brand": false,
        "Model": false,
    },
    "memory": {
        "slots": false,
        "brand": false,
        "model": false,
    },
    "storage": {
        "hdd-ssd": false,
        "size": false,
        "brand": false,
        "model": false,
    },
}

/**
 * 
 * @param {string} value
 * 
 * REQUIRES: value is string which represents the value of a dropdown item
 * MODIFIES: GPU button
 * EFFECTS: called when a dropdown item is selected, overwriting the text in the button to the value of an item. 
 */
function handleDropdown(component, type, next, value) {
    let btnName = component + '-' + type.toLowerCase() + "-btn";
    let btn = document.getElementById(btnName);
    btn.innerHTML = value;
    states[component][type] = true;

    if (next != null) {
        generateDropdown(component, type, next, value);
    }

    if (isSelected(component)) {
        let current = document.getElementById(component + "-select");
        console.log(current.dataset.next);
        let next = document.getElementById(current.dataset.next);
        next.classList.remove("d-none");
        next.classList.add("slide-in");
        
    }
}

// 1. fetch data
// 2. filter data
// 3. render dropdown based on the data
function generateDropdown(component, type, next, value) {
    let newUrl = config.url + "?type=" + component;
    fetch(newUrl)
    .then(res=>res.json())
    .then((data)=> {
        console.log(data);
        let filteredData = filterData(data, type, value);
        console.log(filteredData);
        renderDropdown(filteredData, component, next);
    });
}

function filterData(data, type, value) {
    let res = [];
    for (obj of data) {
        if(obj[type] == value) res.push(obj);
    }

    return res;
}

function renderDropdown(data, component, type) {
    let parentName = component + "-" + type.toLowerCase() + "-items";
    let target = document.getElementById(parentName);
    target.innerHTML = "";

    for (obj of data) {
        target.append(generateItem(obj, component, type))
    }
}

function generateItem(obj, component, type) {
    let value = obj[type];
    let elm = document.createElement("li");
    elm.innerHTML = 
    `
        <a class="dropdown-item" href="#" onClick="handleDropdown('${component}', '${type}', null, '${value}')">${value}</a>
    `;

    return elm;
}

function isSelected(component) {
    let componentState = states[component];
    for (state in componentState) {
        if(!componentState[state]) return false;
    }

    return true;
}