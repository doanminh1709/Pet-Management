'use strict';

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const petList = getFromStorage(KEY) ?? [];
const fileInput = document.getElementById("input-file");

function saveStaticDataToFile() {
    var blob = new Blob([JSON.stringify(petList)], { type: "text/plain;charset=utf-8" });
    const isExport = confirm("Bạn có chắc chắn Export ?");
    if (isExport) saveAs(blob, "manage_pet.txt");
}

function handleImportFile() {

    if (!fileInput.value) {
        alert('Vui lòng chọn file muốn import trước!');
    } else {
        var file = fileInput.files[0];
        if (file) {
            // Using 'FileReader' to read content of file below world type, after finish
            // onload will active and content of file in e.target.result 
            var reader = new FileReader();
            reader.onload = function (e) {
                const contentFile = JSON.parse(e.target.result);
                console.log(contentFile);
                //save to local storage 
                try {
                    saveToStorage(KEY, contentFile);
                    alert('Save data success!');
                    fileInput.value = "";
                } catch (error) {
                    console.log(error);
                }
            };
            reader.readAsText(file);
        } else {
            console.log('No file selected.');
        }
    }
}

exportBtn.addEventListener('click', saveStaticDataToFile);
importBtn.addEventListener('click', handleImportFile);
