const kaydetBtn = document.querySelector('#ekleButton');
const silBtn = document.querySelector('#silButton');
const IDInput = document.querySelector('#ID');
const isimInput = document.querySelector('#adsoyad');
const bransInput = document.querySelector('#brans');
const TCInput = document.querySelector('#tcNo');
const sifreInput = document.querySelector('#sifre');
const telNoInput = document.querySelector('#telNo');
const cinsiyetInput = document.querySelector('#cinsiyet');
const tableBody = document.querySelector('.table tbody');

let doktorListesi = [];

runEvents();

function runEvents(){
    document.addEventListener("DOMContentLoaded", pageloaded);
    kaydetBtn.addEventListener("click", addDoktor);
    silBtn.addEventListener("click", deleteDoktor);
}

function checkDoktorListesiFromStorage(){
    if(localStorage.getItem("doktor") !== null){
        doktorListesi = JSON.parse(localStorage.getItem("doktor"));
    }
}

function addDoktor(event){
    event.preventDefault();
    const id = IDInput.value;
    const isim = isimInput.value;
    const brans = bransInput.value;
    const tc = TCInput.value;
    const sifre = sifreInput.value;
    const telNo = telNoInput.value;
    const cinsiyet = cinsiyetInput.value;

    if (!id || !isim || !brans || !tc || !sifre || !telNo || !cinsiyet){
        showAlert("danger", "Tüm alanları doldurmanız gerekiyor.");
        return;
    }

    const newDoktor = {
        id: id,
        isim: isim,
        brans: brans,
        tc: tc,
        sifre: sifre,
        telNo: telNo,
        cinsiyet: cinsiyet
    };

    addDoktorToUI(newDoktor);
    addDoktorToStorage(newDoktor);
    showAlert("success", "Doktor başarıyla sisteme eklendi.");
    clearFormInputs();
}

function addDoktorToUI(doktor){
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${doktor.id}</td>
    <td>${doktor.isim}</td>
    <td>${doktor.brans}</td>
    <td>${doktor.tc}</td>
    <td>${doktor.sifre}</td>
    <td>${doktor.telNo}</td>
    <td>${doktor.cinsiyet}</td>
    `;
}

function addDoktorToStorage(newDoktor){
    doktorListesi.push(newDoktor);
    localStorage.setItem("doktor", JSON.stringify(doktorListesi));
}

function pageloaded(){
    checkDoktorListesiFromStorage();
    doktorListesi.forEach(function(doktor){
        addDoktorToUI(doktor);
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
    isimInput.value = '';
    bransInput.value = '';
    TCInput.value = '';
    sifreInput.value = '';
    telNoInput.value = '';
    cinsiyetInput.value = '';
}

function deleteDoktor(){
    const deleteID = parseInt(document.querySelector('#ID').value);
    if(!deleteID || isNaN(deleteID)) {
        showAlert("danger", "Geçersiz ID girdiniz.");
        return;
    }

    const index = doktorListesi.findIndex(doktor => doktor.id === deleteID);
    if(index === 0) {
        showAlert("danger", "Bu ID'ye sahip bir doktor bulunamadı.");
        return;
    }

    doktorListesi.splice(index, 1);
    localStorage.setItem("doktor", JSON.stringify(doktorListesi));

    const rows = document.querySelector('.table tbody tr');
    if(rows.length > 0){
        rows.forEach(row => {
            if(row.cells.length > 0) {
                if(parseInt(row.cells[0].textContent) === deleteID){
                    row.remove();
                }
            }
        });
    }

    showAlert("succes", "Doktor Başarıyla silindi.");
    location.reload();
}