const libraryBooks = [];

const formSubmission = document.querySelector(".book-form");
const bookDisplay = document.querySelector(".book-display");

function Book(author, title, pages, status) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = function () {
  this.status = !this.status;
};

formSubmission.addEventListener("submit", function (event) {
  event.preventDefault();
  const author = event.target.author.value;
  const title = event.target.title.value;
  const pages = Number(event.target.pages.value);
  const status = event.target.read.checked;
  addBookToLibrary(author, title, pages, status);
  displayBooks();
  formSubmission.reset();
});

bookDisplay.addEventListener("click", function (event) {
  // Toggle status
  if (event.target.classList.contains("toggle-btn")) {
    const id = event.target.dataset.id;
    const book = libraryBooks.find((b) => b.id === id);
    if (book) {
      book.toggleStatus();
      const bookCard = event.target.closest(".book-card");
      const statusText = bookCard.querySelector(".status-text");
      statusText.textContent = `Status: ${book.status ? "Read" : "Not Read"}`;
    }
  }
  // Remove Book
  if (event.target.classList.contains("remove-btn")) {
    const id = event.target.dataset.id;
    const index = libraryBooks.findIndex((b) => b.id === id);
    if (index !== -1) {
      libraryBooks.splice(index, 1);
      const bookCard = event.target.closest(".book-card");
      bookCard.remove();
    }
  }
});

function addBookToLibrary(author, title, pages, status) {
  const newBook = new Book(author, title, pages, status);
  libraryBooks.push(newBook);
  return newBook;
}

function displayBooks() {
  //Reset display
  bookDisplay.innerHTML = "";
  //Add books to display
  libraryBooks.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;
    bookCard.innerHTML = `
      <p>Author: ${book.author}</p>
      <p>Title: ${book.title}</p>
      <p>Number of Pages: ${book.pages}</p>
      <p class="status-text">Status: ${book.status ? "Read" : "Not Read"}</p>
      <button class="toggle-btn" data-id="${book.id}">Toggle Status</button>
      <button class="remove-btn" data-id="${book.id}">Remove</button>
    `;
    bookDisplay.appendChild(bookCard);
  });
}
