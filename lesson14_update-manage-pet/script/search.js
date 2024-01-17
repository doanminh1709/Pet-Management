'use strict';

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const check_vaccinated = document.getElementById('input-vaccinated');
const check_dewormed = document.getElementById('input-dewormed');
const check_sterilized = document.getElementById('input-sterilized');
const bodyContent = document.getElementById("tbody");
const findButton = document.getElementById("find-btn");
const breedList = getFromStorage(KEYBREED) ?? [];
const petList = getFromStorage(KEY) ?? [];

const dataInform = () => ({
    "id": idInput.value,
    "name": nameInput.value,
    "type": typeInput.value,
    "breed": breedInput.value,
    "vaccinated": check_vaccinated.checked,
    "dewormed": check_dewormed.checked,
    "sterilized": check_sterilized.checked
});
function selectBreedByAnimal(animalName) {
    const breedListByAnimal = [];
    breedInput.innerHTML = '<option>Select Breed</option>';
    breedList.filter((item) => {
        if (animalName === 'Cat' && item.typeBreed === animalName) {
            breedListByAnimal.push(item);
        } else if (animalName === 'Dog' && item.typeBreed === animalName) {
            breedListByAnimal.push(item);
        }
    });

    for (let i = 0; i < breedListByAnimal.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = breedListByAnimal[i].breedName;
        breedInput.appendChild(option);
    }
}
//define user don't select 
selectBreedByAnimal(typeInput.value);
//active change event when user change
typeInput.addEventListener('change', function () {
    selectBreedByAnimal(typeInput.value);
});

function searchByFields(data) {
    const result = petList.filter(function (item) {
        //Cach 1 : Kiem tra tung truong du lieu 1 co null k de check 

        //kiem tra dieu kien neu gia tri nhap trong truong form ma khong co gia tri thi se bo qua 
        //Cach 2
        return (!data.id || item.id.toLowerCase().includes(data.id.toLowerCase()))
            && (!data.name || item.name.toLowerCase().includes(data.name.toLowerCase()))
            && (!data.type !== 'Select Type' || item.type === data.type)
            && (!data.breed || item.breed === data.breed)
            && (!data.vaccinated || item.vaccinated === data.vaccinated)
            && (!data.dewormed || item.dewormed === data.dewormed)
            && (!data.sterilized || item.sterilized === data.sterilized);
    });
    return result;
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
     </tr>`
    }
    bodyContent.innerHTML = html;
}
updateDataToTable(petList);
findButton.addEventListener('click', function () {
    const dataInForm = dataInform();
    console.log(dataInForm);
    const dataSearch = searchByFields(dataInForm);
    updateDataToTable(dataSearch);
})