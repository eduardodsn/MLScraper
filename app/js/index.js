const osmosis = require('osmosis');


let search_button = document.getElementById('search_button');
let product_input_text = document.getElementById('product_input_text');
let container = document.getElementById('cards_container');

search_button.addEventListener('click', getMlData);


function getMlData() {
    console.log('hello boya')
    // let product_name = product_input_text.value;
    // osmosis
    // .get(`https://lista.mercadolivre.com.br/${product_name}`)
    // .find('div.ui-search-result__wrapper')
    // .set({
    //     title: 'h2.ui-search-item__title.ui-search-item__group__element',
    //     img: 'img.ui-search-result-image__element@src'
    // })
    // .data(data => {
    //     appendNewCard(data);
    // });
}

// function appendNewCard(data) {
//     const div = document.createElement('div')
//     div.classList = 'card'
//     div.innerHTML = data
//     container.appendChild(div)
// }
