const osmosis = require('osmosis');


let search_button = document.getElementById('search_button');
let product_input_text = document.getElementById('product_input_text');
let container = document.getElementById('cards_container');

search_button.addEventListener('click', getMlData);


function getMlData() {
    container.innerHTML = "";
    let product_name = "teclado mecânico" //product_input_text.value;

    osmosis
    .get(`https://lista.mercadolivre.com.br/${product_name}`)
    .find('div.ui-search-result__wrapper')
    .set({
        img: 'img.ui-search-result-image__element@src',
        title: 'h2.ui-search-item__title',
        priceFraction: 'span.price-tag-fraction',
        priceCents: 'span.price-tag-cents'
    })
    .data(data => {
        console.log(data);
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
