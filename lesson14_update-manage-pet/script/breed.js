'use strict';
const breedName = document.getElementById("input-breed");
const typeBreed = document.getElementById("input-type");
const breedList = getFromStorage(KEYBREED) ?? [];
const btnSubmit = document.getElementById("submit-btn");
const tableBodyBreed = document.getElementById("tbody");


const initBreed = () => ({
    "breedName": breedName.value,
    "typeBreed": typeBreed.value
});
showAllListBreed();

function checkDataValid(data) {
    if (!Boolean(data.breedName) || !Boolean(data.typeBreed)) {
        alert('Please , fill all filed data ');
    } else {
        if (!Boolean(data.breedName)) {
            alert('Please enter Breed!');
        } else if (!Boolean(data.typeBreed) || data.typeBreed === 'Select Type') {
            alert('Please select Type!');
        } else {
            return true;
        }
        return false;
    }
    return false;
}

function addBreedToList() {
    const dataInsert = initBreed();
    console.log(dataInsert);
    if (checkDataValid(dataInsert)) {
        breedList.push(dataInsert);
        saveToStorage(KEYBREED, breedList);
        resetInput();
        showAllListBreed();
    }
}

function resetInput() {
    breedName.value = '';
    typeBreed.value = 'Select Type';
}

function createRowInTableBreed(breedList) {
    tableBodyBreed.innerHTML = "";
    let html = "";
    for (let i = 0; i < breedList.length; i++) {
        html += `<tr>
                <td>${i + 1}</td>
                <td>${breedList[i].breedName}</td>
                <td>${breedList[i].typeBreed}</td>
                <td><button onClick="deletePet('${breedList[i].breedName}')" class = "btn btn-danger btn-delete">Delete</button></td>
            </tr>`;
    }
    tableBodyBreed.innerHTML = html;
}


function showAllListBreed() {
    createRowInTableBreed(breedList);
}
const deletePet = (breedName) => {
    const index = breedList.findIndex(item => item.breedName === breedName);
    if (index !== -1 && confirm('Are you sure?')) {
        console.log('Before delete ', breedList.length);
        breedList.splice(index, 1);
        console.log('After delete ', breedList.length);
        tableBodyBreed.innerHTML = '';
        saveToStorage(KEYBREED, breedList);
        resetInput();
        showAllListBreed();
    }
}
btnSubmit.addEventListener('click', addBreedToList);
