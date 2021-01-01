var osmosis = require('osmosis');

osmosis
    .get('https://lista.mercadolivre.com.br/acer')
    .find('div.ui-search-result__wrapper')
    .set({
        title: 'h2.ui-search-item__title.ui-search-item__group__element',
        img: 'img.ui-search-result-image__element@src'
    })
    .data(data => {
        console.log(data)
    });