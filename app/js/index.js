const osmosis = require('osmosis');
var open = require('open');



let searchButton = document.getElementById('search_button');
let productInputText = document.getElementById('product_input_text');
let container = document.getElementById('cards_container');

searchButton.addEventListener('click', getMlData);

document.addEventListener ('keypress', (event) => {
    event.key == 'Enter' ? getMlData() : null;
});

function getMlData() {
    container.innerHTML = "";
    let productName = formatProductName(productInputText.value) + '_DisplayType_LF';

    osmosis
    .get(`https://lista.mercadolivre.com.br/${productName}`)
    .find('div.ui-search-result__wrapper')
    .set({
        img: 'img.ui-search-result-image__element@src',
        title: 'h2.ui-search-item__title',
        priceFraction: 'span.price-tag-fraction',
        priceCents: 'span.price-tag-cents',
        productLink: 'a.ui-search-item__group__element.ui-search-link@href'
    })
    .data(data => {
        appendNewCard(data);
    });
}

function appendNewCard(data) {
    const div = document.createElement('div')
    div.classList = 'card'
    div.innerHTML = `
                    <div class="product_link" onclick="openOnBrowser('${data.productLink}')">
                        <img src="${data.img}" alt="Imagem do produto">
                        <div class="product_infos">
                            <p class="product_title">${data.title}</p>
                            <p class="product_price">R$${data.priceFraction},${data.priceCents}</p>
                        </div>
                    </div>
                    `
    container.appendChild(div);
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

function openOnBrowser(url) {
    open(url);
}