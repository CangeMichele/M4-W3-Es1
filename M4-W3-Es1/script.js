//SCARICO DATI API -------------------------------------------

const url = 'https://striveschool-api.herokuapp.com/books';
let apiResult = [];

fetch(url)

    .then((response) => response.json())

    .then((libreria) => {

        apiResult = libreria; //clono libreria in apiResul così da non dovre fare più di un fetch()

        cardsCreate(libreria); //creo le cards

    }) // .then => libreria




//FUNZIONE cardsCreate ---------------------------------------
function cardsCreate(array) {
    const colCard = document.getElementById('libreria');
    colCard.innerHTML = '';

    array.forEach(libro => {

        const col = document.createElement('div');
        col.className = 'col';

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', libro.asin);

        const img = document.createElement('img');
        img.className = 'card-img-top mx-auto';
        img.setAttribute('src', libro.img);
        img.setAttribute('alt', `cover ${libro.titolo}`);

        const cardBody =  document.createElement('div');
        cardBody.className = 'card-body';

        const h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.textContent = libro.title;

        const pPrice = document.createElement('p');
        pPrice.className = 'price';
        pPrice.innerText = `$${libro.price}`;

        const pCategory = document.createElement('p');;
        pCategory.innerText = libro.category;

        const buttonCart = document.createElement('button');
        buttonCart.className = 'btn btn-sm border-0 btn-outline-secondary';
        buttonCart.setAttribute('type', 'button');
        buttonCart.setAttribute('onclick', 'carrello(this)');


        const iCart = document.createElement('i');
        iCart.className = 'bi bi-cart-plus';

        const buttonSalta = document.createElement('button');;
        buttonSalta.className = 'btn btn-secondary btn-sm';
        buttonSalta.setAttribute('type', 'button');
        buttonSalta.setAttribute('onclick', 'salta(this)');
        buttonSalta.textContent = 'salta';
        

        const buttonDetails = document.createElement('button');
        buttonDetails.className = 'btn btn-secondary btn-sm';
        buttonDetails.setAttribute('type', 'button');
        buttonDetails.textContent = 'dettagli';

        //al click sul bottone vado nella pagina dettagli e mi porto dietro l'id 
        buttonDetails.onclick = ()=> 
            (window.location = `details.html?bookId=${libro.asin}`);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer text-body-secondary';
        cardFooter.textContent = `asin: ${libro.asin}`;

        cardBody.appendChild(h5);
        cardBody.appendChild(pPrice);
        cardBody.appendChild(pCategory);
        
        buttonCart.appendChild(iCart);
        cardBody.appendChild(buttonCart);
        
        cardBody.appendChild(buttonCart);
        cardBody.appendChild(buttonSalta);
        cardBody.appendChild(buttonDetails);
        
        
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        col.appendChild(card);

        colCard.appendChild(col);


    })
}




//FUNZIONE SALTA ---------------------------------------------

function salta(btnEscludi) {
    //closest prende il genitore primo o il primo che corrisponde ai requisiti tra parentesi
    let cardCol = btnEscludi.closest('.col');
    cardCol.classList.add('d-none');
};





//FUNZIONE CARRELLO ------------------------------------------

function carrello(btnCarrello) {

    //dichiarazione costanti da card cliccata
    const idCard = btnCarrello.closest('.card').id;
    const cardBody = btnCarrello.closest('.card-body');
    const cardTitle = cardBody.querySelector('.card-title').textContent;
    const price = cardBody.querySelector('.price').textContent;

    // controllo se bottone non è evidenziato(btn-warning)
    if (btnCarrello.classList.contains('btn-outline-secondary')) {


        //evidenzia carrello nella card
        btnCarrello.classList.remove('btn-outline-secondary');
        btnCarrello.classList.add('btn-warning');

        // aggiunngo alla dropdown
        cartList = document.getElementById('dropdown-cart');
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.setAttribute('id', `li${idCard}`);

        const p = document.createElement('p');
        p.className = 'dropdown-item';
        p.textContent = cardTitle

        const spanPrice = document.createElement('span');
        spanPrice.className = 'text-body-secondary cart-price';
        spanPrice.textContent = price;

        const spanTrash = document.createElement('span');
        spanTrash.className = 'ms-auto';

        const i = document.createElement('i');
        i.className = 'bi bi-trash3';
        i.setAttribute('onclick','removeItems(this)' );

        p.appendChild(spanPrice);

        spanTrash.appendChild(i);
        p.appendChild(spanTrash);

        li.appendChild(p);

        cartList.appendChild(li);



    } else {

        //rimuove evidenzitura carrello nella card
        btnCarrello.classList.remove('btn-warning');
        btnCarrello.classList.add('btn-outline-secondary');

        //rimuove alla dropdown
        document.getElementById('li' + idCard).remove();

    }

    //contatore carrello     
    let inCart = document.querySelectorAll('.btn-warning');

    if (inCart.length === 0) {
        document.getElementById('li-nav-empty').classList.remove('d-none');
        document.getElementById('clear-cart').classList.add('d-none');
    } else {
        document.getElementById('li-nav-empty').classList.add('d-none');
        document.getElementById('clear-cart').classList.remove('d-none');
    }

    const dropdownCart = document.querySelector('.dropdown-toggle');
    dropdownCart.innerHTML = `${inCart.length} <i class="bi bi-cart3"></i>`
}




// FUNZIONE RICERCA -----------------------------------------

const srcInput = document.getElementById('src-input');

srcInput.addEventListener("input", function () {
    const srcTitle = this.value.toLowerCase();

    if (srcTitle.length >= 3) {
        const cards = apiResult.filter((card) =>
            card.title.toLowerCase().includes(srcTitle)
        );

        cardsCreate(cards);

    } else {
        cardsCreate(apiResult);
    }

});




// FUNZIONE PILISCI CARRELLO ----------------------------------

//svuota -----
function clearCart() {
    const cartList = document.querySelectorAll('.cart-item');

    cartList.forEach(item => {
        const id = item.id.replace('li', '');

        const card = document.getElementById(id);

        //prende il primo bottone che trova, quindi quello del carrello
        const btnCart = card.querySelector('button');

        btnCart.classList.remove('btn-warning');
        btnCart.classList.add('btn-outline-secondary');

        item.remove();
    });

    //resetto cart-menu
    const dropdownCart = document.querySelector('.dropdown-toggle');
    dropdownCart.innerHTML = `0 <i class="bi bi-cart3"></i>`;
    document.getElementById('li-nav-empty').classList.remove('d-none');
    document.getElementById('clear-cart').classList.add('d-none');

}

//elimina elemento -----
function removeItems(items) {
    const li = items.closest('li');
    const id = li.id.replace('li', '');
    const card = document.getElementById(id);
    const btnCart = card.querySelector('button');

    btnCart.classList.remove('btn-warning');
    btnCart.classList.add('btn-outline-secondary');

    li.remove();

    const cartItems = document.querySelectorAll('.cart-item');
    const dropdownCart = document.querySelector('.dropdown-toggle');


    if (cartItems.length === 0) {

        dropdownCart.innerHTML = `0 <i class="bi bi-cart3"></i>`;
        document.getElementById('li-nav-empty').classList.remove('d-none');
        document.getElementById('clear-cart').classList.add('d-none');
    } else {
        dropdownCart.innerHTML = `${cartItems.length} <i class="bi bi-cart3"></i>`;

    }
}




