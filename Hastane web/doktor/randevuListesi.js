document.addEventListener("DOMContentLoaded", function () {
    var kitap = JSON.parse(localStorage.getItem("randevu"));

    if (!randevu) {
        randevu = [];
    }

    var randevuListesiHTML = document.querySelector('.table tbody');
    randevu.forEach(function (randevu) {
        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${randevu.ID}</td>
        <td>${randevu.isim}</td>
        <td>${randevu.tc}</td>
        <td>${randevu.tarih}</td>
        <td>${randevu.saat}</td>
        <td>${randevu.tel}</td>
        <td>${randevu.cinsiyet}</td>
        `;
        randevuListesiHTML.appendChild(row);
    })
})