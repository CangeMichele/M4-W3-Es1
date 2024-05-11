const params = new URLSearchParams(window.location.search);
const idRequest = params.get('bookId');

const detailURL = `https://striveschool-api.herokuapp.com/books/${idRequest}`;

fetch(detailURL)
    .then((response) => response.json())
    .then((book) =>{
        console.log(book);
        
        const card = document.getElementById('card');

        const cardRow = document.createElement('div');
        cardRow.className ='row g-0';

        const cardCol4 = document.createElement('div');
        cardCol4.className ='col-md-4'

        const img = document.createElement('img');
        img.setAttribute('src', book.img);
        img.setAttribute('alt', `cover ${book.title}`);
        img.className='img-fluid rounded-start';

        const cardCol8 = document.createElement('div');
        cardCol8.className = 'col-md-8';

        const cardBody = document.createElement('div');
        cardBody.className ='card-body';

        const title = document.createElement('h5');
        title.className ='card-title';
        title.textContent = book.title;

        const category = document.createElement('p');
        category.className = 'card-text';
        category.textContent = book.category;

        const price = document.createElement('p');
        price.className = 'card-text';
        price.textContent = `$${book.price}`;

        const asin = document.createElement('p');
        asin.className ='text-card';
        asin.textContent='asin: ';

        const small = document.createElement('small');
        small.className='text-body-secondary';
        small.textContent = book.asin;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(category);

        asin.appendChild(small);

        cardBody.appendChild(asin);

        cardCol8.appendChild(cardBody);

        cardCol4.appendChild(img);
        
        cardRow.appendChild(cardCol4);
        cardRow.appendChild(cardCol8);

        card.appendChild(cardRow);

    });