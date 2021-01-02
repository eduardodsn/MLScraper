var osmosis = require('osmosis');

function getMlData() {
    // osmosis
    // .get('https://lista.mercadolivre.com.br/acer')
    // .find('div.ui-search-result__wrapper')
    // .set({
    //     title: 'h2.ui-search-item__title.ui-search-item__group__element',
    //     img: 'img.ui-search-result-image__element@src'
    // })
    // .data(data => {
    //     appendNewCard(container, data)
    // });
}

function appendNewCard(container, data) {
    const div = document.createElement('div')
    div.classList = 'card'
    div.innerHTML = data
    container.appendChild(div)
}
