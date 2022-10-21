const addBook = document.querySelector('.addButton');
const form = document.querySelector('.addButtonForm');
const container = document.querySelector('.container');
const cancelBtn = document.querySelector('#cancel');
const mainCards = document.querySelector('.main-cards');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formNumber = document.querySelector('#pages');
const formLang = document.querySelector('#language');
const formYear = document.querySelector('#year');
const select = document.querySelector('select');
const totalBooks = document.querySelector('#total');
const finishedBooks = document.querySelector('#finished');
const notFinishedBooks = document.querySelector('#not-finished');


let readBooks = 0;
let allRead = 0
const library = [];

const displayForm = (e) => {
    form.classList.remove('hide');
    form.classList.add('show');
    container.classList.add('lower-opacity');
};

const closeForm = (e) => {
    form.classList.add('hide');
    form.classList.remove('show');
    container.classList.remove('lower-opacity');
};
const displayBook = (e) => {
    e.preventDefault();

    class Book {
        constructor(bookTitle, bookAuthor, bookPages, bookLang, bookYear, bookStatus) {
            this.bookTitle = bookTitle;
            this.bookAuthor = bookAuthor;
            this.bookPages = bookPages;
            this.bookLang = bookLang;
            this.bookYear = bookYear;
            this.bookStatus = bookStatus;
        }
    }

    let allRead = 0;
    const card = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = 'Book title: ' + formTitle.value;
    card.appendChild(title);
    const author = document.createElement('h3');
    author.textContent = 'Book author: ' + formAuthor.value;
    card.appendChild(author);
    const pages = document.createElement('h3');
    pages.textContent = 'Number of pages: ' + formNumber.value;
    card.appendChild(pages);
    const language = document.createElement('h3');
    language.textContent = 'Language: ' + formLang.value;
    card.appendChild(language);
    const year = document.createElement('h3');
    year.textContent = 'Year: ' + formYear.value;
    card.appendChild(year);
    const remove = document.createElement('div');
    const read = document.createElement('div');
    card.classList.add('card');
    remove.textContent = 'Delete';
    remove.classList.add('btn');
    remove.classList.add('failure-color');
    if (select.value == 'read') {
        read.textContent = 'Change status to Not read';
        read.classList.add('neutral-btn');
    } else if (select.value == 'not-read') {
        read.textContent = 'Change status to Read';
        read.classList.add('success-color');
    }
    read.classList.add('btn');
    card.append(read);
    card.appendChild(remove);
    mainCards.appendChild(card);
    form.classList.add('hide');
    form.classList.remove('show');
    container.classList.remove('lower-opacity');
    
    changeStatus = (e) => {
        if (read.textContent == 'Change status to Read') {
            read.textContent = 'Change status to Not read';
            read.classList.remove('success-btn');
            read.classList.add('neutral-btn');
            readBooks += 1;
            finishedBooks.textContent = 'Books read: ' + readBooks;
            notFinishedBooks.textContent = 'Books not read: ' + (library.length - readBooks);
        } else {
            read.textContent = 'Change status to Read';
            read.classList.remove('neutral-btn');
            read.classList.add('success-color');
            readBooks -= 1;
            finishedBooks.textContent = 'Books read: ' + readBooks;
            notFinishedBooks.textContent = 'Books not read: ' + (library.length - readBooks);
        }
    }
    
    const newBook = new Book(formTitle.value, formAuthor.value, formNumber.value , formLang.value, formYear.value, select.value);
    library.push(newBook);

    
    const countRead = () => {
        for(let i = library.length - 1; i < library.length; i++) {
            if (library[i].bookStatus == 'read') {
                readBooks += 1;
            }
        }
    }

    const removeBook = (e) => {
        if (read.classList.contains('neutral-btn')) {
            readBooks -= 1;
        }
        library.pop();
        mainCards.removeChild(card);
        finishedBooks.textContent = 'Books read: ' + readBooks;
        notFinishedBooks.textContent = 'Books not read: ' + (library.length - readBooks);
        totalBooks.textContent = 'Total books: ' + library.length;
    };

    countRead();
    finishedBooks.textContent = 'Books read: ' + readBooks;
    notFinishedBooks.textContent = 'Books not read: ' + (library.length - readBooks);
    totalBooks.textContent = 'Total books: ' + library.length;
    remove.addEventListener('click', removeBook);
    read.addEventListener('click', changeStatus);
    
};


addBook.addEventListener('click', displayForm);
cancelBtn.addEventListener('click', closeForm);
form.addEventListener('submit', displayBook);

