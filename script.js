const myLibrary = [];

addBookToLibrary("Test", "Author", "900", "Read");
addBookToLibrary("Test 2", "Author 2", "902", "Not read")

displayMyLibrary()

const addBookBtn = document.querySelector(".add-book");
const addBookModal = document.querySelector(".add-book-modal");

const bookForm = document.querySelector(".new-book-form")
const submitBookBtn = document.querySelector(".submit-book");

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new book(title, author, pages, read));
    displayMyLibrary();
}
function deleteBookCard(e) {
    const removeBook = e.target
    const bookCardRemove = removeBook.parentElement.parentElement.parentElement

    const indexToRemove = bookCardRemove.dataset.bookIndex;
    myLibrary.splice(indexToRemove, 1);
    
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
            myLibrary[bookIndex].read = "Not read"
        } else {
            buttonRead.textContent = "Read";
            buttonRead.classList.toggle("book-not-read")
            myLibrary[bookIndex].read = "Read"
        }
        console.log(myLibrary[bookIndex]);
}

function displayMyLibrary() {
    const main = document.querySelector("main");
    let counter = 0;

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
            removeBookIcon.setAttribute("src", "/images/cross-svgrepo-com.svg");
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

submitBookBtn.addEventListener("click", () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    addBookToLibrary(title, author, pages, read);

    document.querySelector(".new-book-form").reset();
    addBookModal.close();
})

