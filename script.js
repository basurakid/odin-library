const myLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const windAndTruth = new book("WInd and truth", "Brandon Sanderson", 1404, false)

console.log(windAndTruth.info())