'use strict';

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const check_vaccinated = document.getElementById('input-vaccinated');
const check_dewormed = document.getElementById('input-dewormed');
const check_sterilized = document.getElementById('input-sterilized');
const breedList = getFromStorage(KEYBREED) ?? [];
const petList = getFromStorage(KEY) ?? [];
const bodyContent = document.getElementById("tbody");
const activeForm = document.querySelector(".hide");
const submitForm = document.getElementById("submit-btn");

let currentPetId = "";
let currentTypeBreed = "";

const dataInform = () => ({
    "id": idInput.value,
    "name": nameInput.value,
    "age": parseInt(ageInput.value),
    "type": typeInput.value,
    "weight": parseFloat(weightInput.value),
    "length_pet": lengthInput.value,
    "color": colorInput.value,
    "breed": breedInput.value,
    "vaccinated": check_vaccinated.checked,
    "dewormed": check_dewormed.checked,
    "sterilized": check_sterilized.checked,
    "date": formatDate(new Date())
});

function checkDataValid(data) {
    if (!Boolean(data.id) || !Boolean(data.name) || !Boolean(data.age)
        || !Boolean(data.weight) || !Boolean(data.length_pet) || !Boolean(data.color)) {
        alert('Please , fill all filed data ')
    } else {
        if (data.age < 1 || data.age > 15) {
            alert('Age must be between 1 and 15!');
            return false;
        } else if (data.weight < 1 || data.weight > 15) {
            alert('Weight must be between 1 and 15!');
            return false;
        } if (data.length_pet < 1 || data.length_pet > 100) {
            alert('Length must be between 1 and 100!');
            return false;
        } else if (Boolean(data.type) && data.type === "Select Type") {
            alert('Please select Type!');
            return false;
        } else if (Boolean(data.breed) && data.breed === "Select Breed") {
            alert('Please select Breed!');
            return false;
        } else {
            return true;
        }
    }
    return false;
}
const updateDataToTable = (petList) => {
    bodyContent.innerHTML = "";
    let html = "";

    for (let index = 0; index < petList.length; index++) {
        const checked = 'bi bi-check-circle-fill';
        const unchecked = 'bi bi-x-circle-fill';
        const vaccinated = petList[index].vaccinated;
        const dewormed = petList[index].dewormed;
        const sterilized = petList[index].sterilized;
        html += `<tr>
        <td>${petList[index].id}</td>
        <td>${petList[index].name}</td>
        <td>${petList[index].age}</td>
        <td>${petList[index].type}</td>
        <td>${petList[index].weight}</td>
        <td>${petList[index].length_pet}</td>
        <td>${petList[index].breed}</td>
        <td><i class="bi bi-square-fill" style="color:${petList[index].color};"></i></td>
        <td><i class="${Boolean(vaccinated) ? checked : unchecked}"></i></td>
        <td><i class="${Boolean(dewormed) ? checked : unchecked}"></i></td>
        <td><i class="${Boolean(sterilized) ? checked : unchecked}"></i></td>
        <td>${petList[index].date}</td>
        <td><button onclick="editPet('${petList[index].id}')" class = "btn btn-warning btn-edit">Edit</button></td>
     </tr>`
    }
    bodyContent.innerHTML = html;
}
updateDataToTable(petList);


function editPet(petId) {
    activeForm.style.display = 'block';
    const pet = petList.find(item => item.id === petId);
    currentTypeBreed = pet.type;
    setValue(pet);
    selectBreedByAnimal(currentTypeBreed);
    currentPetId = petId;
}

function selectBreedByAnimal(animalName) {
    const breedListByAnimal = [];
    breedInput.innerHTML = '<option>Select Breed</option>';
    breedList.filter((item) => {
        if (animalName === 'Cat' && item.typeBreed === animalName) {
            breedListByAnimal.push(item);
        } else if (animalName === 'Dog' && item.typeBreed === animalName) {
            breedListByAnimal.push(item);
        } else if (animalName === 'Select Type') {
            breedListByAnimal.push(item);
        }
    });

    for (let i = 0; i < breedListByAnimal.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = breedListByAnimal[i].breedName;
        breedInput.appendChild(option);
    }
}

typeInput.addEventListener('change', function () {
    selectBreedByAnimal(typeInput.value);
});

function setValue(data) {
    idInput.value = data.id;
    nameInput.value = data.name;
    ageInput.value = data.age;
    typeInput.value = data.type;
    weightInput.value = data.weight;
    lengthInput.value = data.length_pet;
    colorInput.value = data.color;
    breedInput.value = data.breed;
    check_vaccinated.checked = data.vaccinated;
    check_dewormed.checked = data.dewormed;
    check_sterilized.checked = data.sterilized;
}

submitForm.addEventListener('click', function () {
    const pet = dataInform();
    editInfoPet(pet);
    activeForm.style.display = 'none';
});

const editInfoPet = (pet) => {
    const index = petList.findIndex(item => item.id === pet.id);
    console.log(pet);
    if (index !== -1 && checkDataValid(pet)) {
        petList[index] = pet;
        saveToStorage(KEY, petList);
        updateDataToTable(petList);
    }
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}