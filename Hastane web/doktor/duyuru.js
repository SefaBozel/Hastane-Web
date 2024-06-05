var duyuruListesiHTML = document.querySelector('.container');
var duyuru = [
    {ID: 1, olusturan: 'Ali', duyuru: 'Toplantı yarın saat 10:00\'da.'},
    {ID: 2, olusturan: 'Ayşe', duyuru: 'Yeni proje hakkında bilgilendirme.'},
    {ID: 2, olusturan: 'Ayşe', duyuru: 'Yeni proje hakkında bilgilendirme.'},
    {ID: 2, olusturan: 'Ayşe', duyuru: 'Yeni proje hakkında bilgilendirme.'},
    // Diğer duyurular buraya eklenebilir
];

duyuru.forEach(function (duyuru) {
    var duyuruItem = document.createElement('div');
    duyuruItem.classList.add('duyuru-item');
    duyuruItem.innerHTML = `
        <div>${duyuru.ID}</div>
        <div>${duyuru.olusturan}</div>
        <div>${duyuru.duyuru}</div>
    `;
    duyuruListesiHTML.appendChild(duyuruItem);
});