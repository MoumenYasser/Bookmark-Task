var websiteIndex = document.getElementById("websiteIndex");
var websiteName = document.getElementById("websiteName");

var websiteDeleteBtn = document.getElementById("websiteDeleteBtn");

var websiteList = [];

if(localStorage.getItem("websiteList")) {
    getData();
    console.log(websiteList);
}

function validateWebsiteInput (element) {
    console.log(element.id);
    var regex ={ 
        websiteIndex: /^[a-z0-9_-]{3,15}$/,
        websiteName: /^https:\/\/www\.[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        
        return true
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
       return false
    }
}

function addWebsite () {
    if(validateWebsiteInput(websiteIndex) && validateWebsiteInput(websiteName)){    
    
    var website = {
            websiteIndex: websiteIndex.value,
            websiteName: websiteName.value
        }
        websiteList.push(website);
        saveData();
        clearInput();
        removeIsValid();
        displayWebsite();
        console.log(websiteList);
    } else {
        alert("wrong")
    }
}


function displayWebsite() {
    var cartona = ``;

    for (let i = 0; i < websiteList.length; i++) {
        cartona += `<tr>
        <th>${[i+1]}</th>
        <th>${websiteList[i].websiteIndex}</th>
        <th id="websiteVisitBtn" onclick="visitWebsite()"> 
        <a href = "${websiteList[i].websiteName}" class="btn btn-danger">Visit</a>
        </th>
        <th id="websiteDeleteBtn" onclick="deleteWebsite(${i})"> <button class="btn btn-info"> Delete</button></th>
        </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartona;
}



function removeIsValid(){
    websiteIndex.classList.remove("is-valid");
    websiteName.classList.remove("is-valid");
}

function deleteWebsite(index) {
    websiteList.splice(index, 1);
    console.log(websiteList);
    displayWebsite(websiteList);
    saveData();
}


function clearInput() {
    websiteIndex.value = "";
    websiteName.value = "";
}

function saveData() {
    localStorage.setItem('websiteList', JSON.stringify( websiteList))
}

function getData () {
    websiteList = JSON.parse(localStorage.getItem("websiteList"));
}