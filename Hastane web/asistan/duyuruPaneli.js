const duyuruBtn = document.querySelector('#button');
const IDInput = document.querySelector("#ID");
const olusturanInput = document.querySelector("#olusturan");
const metinInput = document.querySelector("#duyuru");
const tableBody = document.querySelector(".table tbody");

let duyuruListesi = [];

runEvents();

function runEvents(){
    document.addEventListener("DOMContentLoaded", pageloaded);
    duyuruBtn.addEventListener("click", addDuyuru);
}

function checkDuyuruListesiFromStorage(){
    if(localStorage.getItem("duyuru") !== null){
        duyuruListesi = JSON.parse(localStorage.getItem("duyuru"));
    }
}

function addDuyuru(event){
    event.preventDefault();
    const id = IDInput.value;
    const olusturan = olusturanInput.value;
    const metin = metinInput.value;

    if(!id || !olusturan || !metin){
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    const newDuyuru = {
        id: id,
        olusturan: olusturan,
        metin: metin
    };

    addDuyuruToUI(newDuyuru);
    addDuyuruToStorage(newDuyuru);
    showAlert("success", "Duyuru başarıyla gönderildi.");
    clearFormInputs();
}

function addDuyuruToUI(duyuru){
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${duyuru.id}</td>    
    <td>${duyuru.olusturan}</td>
    <td>${duyuru.metin}</td>
    `;
}

function addDuyuruToStorage(newDuyuru){
    duyuruListesi.push(newDuyuru);
    localStorage.setItem("duyuru", JSON.stringify(duyuruListesi));
}

function pageloaded(){
    checkDuyuruListesiFromStorage();
    duyuruListesi.forEach(function(duyuru){
        addDuyuruToUI(duyuru);
    });
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function(){
        div.remove();
    }, 2500);
}

function clearFormInputs(){
    IDInput.value = '';
    olusturanInput.value = '';
    metinInput.value = '';
}

