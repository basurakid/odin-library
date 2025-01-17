const myLibrary = [];

const addBookBtn = document.querySelector(".add-book");
const addBookModal = document.querySelector(".add-book-modal");

const bookForm = document.querySelector(".new-book-form")
const submitBookBtn = document.querySelector(".submit-book");

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new book(title, author, pages, read)); 
}

function displayMyLibrary() {

}

addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
})

submitBookBtn.addEventListener("click", () => {
})

