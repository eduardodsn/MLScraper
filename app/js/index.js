const osmosis = require('osmosis');


let searchButton = document.getElementById('search_button');
let productInputText = document.getElementById('product_input_text');
let container = document.getElementById('cards_container');

searchButton.addEventListener('click', getMlData);
document.addEventListener ('keypress', (event) => {
    event.key == 'Enter' ? getMlData : null;
});


function getMlData() {
    container.innerHTML = "";
    let productName = formatProductName(productInputText.value);

    osmosis
    .get(`https://lista.mercadolivre.com.br/${productName}`)
    .find('div.ui-search-result__wrapper')
    .set({
        img: 'img.ui-search-result-image__element@src',
        title: 'h2.ui-search-item__title',
        priceFraction: 'span.price-tag-fraction',
        priceCents: 'span.price-tag-cents'
    })
    .data(data => {
        appendNewCard(data);
    });
}

function appendNewCard(data) {
    const div = document.createElement('div')
    div.classList = 'card'
    div.innerHTML = `
                        <img src="${data.img}" alt="Imagem do produto">
                        <p>${data.title}</p>
                        <p>R$${data.priceFraction},${data.priceCents}</p>
                    `
    container.appendChild(div)
}

function formatProductName(str) {
    var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž _';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz--";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
      if ((x = accents.indexOf(str[i])) != -1) {
        str[i] = accentsOut[x];
      }
    }

    return str.join('');
  }
