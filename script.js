if (!localStorage.getItem("library")) {
    localStorage.setItem("library", JSON.stringify([]))
} else {
    displayMyLibrary()
}


const addBookBtn = document.querySelector(".add-book");
const addBookModal = document.querySelector(".add-book-modal");

const bookForm = document.querySelector(".new-book-form")
const submitBookBtn = document.querySelector(".submit-book");

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.displayed = false;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const myLibrary = JSON.parse(localStorage.getItem("library"));
    myLibrary.push(new Book(title, author, pages, read));
    localStorage.setItem("library", JSON.stringify(myLibrary))
    displayMyLibrary();
}

function deleteBookCard(e) {
    const removeBook = e.target
    const bookCardRemove = removeBook.parentElement.parentElement.parentElement

    const indexToRemove = bookCardRemove.dataset.bookIndex;
    const myLibrary = JSON.parse(localStorage.getItem("library"));
    myLibrary.splice(indexToRemove, 1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    
    bookCardRemove.remove();

    updateBookCardsIndex();
}

function updateBookCardsIndex() {
    const library = document.querySelector("main");

    let counter = 0;
    for (const card of library.children) {
        card.setAttribute("data-book-index", counter)
        counter++;
    }

}

function changeBookReadStatus(e) {
    const buttonRead = e.target;
    const bookIndex = buttonRead.parentElement.parentElement.dataset.bookIndex;
    console.log(myLibrary[bookIndex])
        if (buttonRead.textContent === "Read") {
            buttonRead.textContent = "Not read";
            buttonRead.classList.toggle("book-not-read");

            const myLibrary = JSON.parse(localStorage.getItem("library"));
            myLibrary[bookIndex].read = "Not read";
            localStorage.setItem("library", JSON.stringify(myLibrary));
        } else {
            buttonRead.textContent = "Read";
            buttonRead.classList.toggle("book-not-read");
            const myLibrary = JSON.parse(localStorage.getItem("library"));
            myLibrary[bookIndex].read = "Read";
            localStorage.setItem("library", JSON.stringify(myLibrary));
            
        }
}

function displayMyLibrary() {
    const main = document.querySelector("main");
    main.textContent = ""
    let counter = 0;
    const myLibrary = JSON.parse(localStorage.getItem("library"))

    for (const book of myLibrary) {
        if (book.displayed === false) {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.setAttribute("data-book-index", counter)

            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");

            const removeBook = document.createElement("button");
            removeBook.classList.add("book-remove");
            const removeBookIcon = document.createElement("img");
            removeBookIcon.setAttribute("src", "images/cross-svgrepo-com.svg");
            removeBookIcon.setAttribute("alt", "x");
            removeBook.appendChild(removeBookIcon);
            removeBook.addEventListener("click",deleteBookCard)
            bookInfo.appendChild(removeBook);

            const bookTitle = document.createElement("p");
            bookTitle.textContent = book.title;
            bookInfo.appendChild(bookTitle);

            const bookAuthor = document.createElement("p");
            bookAuthor.textContent = book.author;
            bookInfo.appendChild(bookAuthor);

            const bookPages = document.createElement("p");
            bookPages.textContent = `${book.pages} pages`;
            bookInfo.appendChild(bookPages);

            const bookRead = document.createElement("button");
            bookRead.classList.add("book-read-button");

            if (book.read == "Read"){
                bookRead.textContent = "Read";
            }
            else {
                bookRead.textContent = "Not read";
                bookRead.classList.add("book-not-read");
            }

            bookRead.addEventListener("click", changeBookReadStatus)
            bookInfo.appendChild(bookRead);
            bookCard.appendChild(bookInfo);

            main.appendChild(bookCard);

            book.displayed = true;
        }
        counter++;
    }
    
}

addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");

    if (title.validity.valid && author.validity.valid && pages.validity.valid) {
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        document.querySelector(".new-book-form").reset();
        addBookModal.close();
    }
    
})

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

title.addEventListener("input", (e) => {
    title.setCustomValidity("");
    if (!title.value.trim()){
        console.log(!title.value.trim(),);
        title.setCustomValidity("Please enter a valid title name (not just spaces)");
    }
})
author.addEventListener("input", (e) => {
    author.setCustomValidity("");
    if (!author.value.trim()){
        console.log("Hey no empty space on the author names");
        author.setCustomValidity("Please enter a valid author name (not just spaces)");
    }
})

pages.addEventListener("input", (e) => {
    pages.setCustomValidity("");

    if (pages.validity.rangeUnderflow) {
        pages.setCustomValidity("Minimun no. of pages: 1 ");
    } else if(!/^\d+$/.test(pages.value.trim())){
        pages.setCustomValidity("Please enter a whole number.")   
    }
})




