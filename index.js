//Book Constuctor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//Add book to list
Book.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  // insert cols
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href ="#" class="delete">x</a></td>`;

  list.appendChild(row);
};
//Delete Book
Book.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
    //show message
    Book.showAlert("Book removed", "success");
  }
};
// Show Alert
Book.showAlert = function(message, className) {
  // create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");
  // get form
  const form = document.querySelector("form");
  //insert alert
  container.insertBefore(div, form);

  //timeout after 3 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};
// clear fields
Book.clearField = function() {
  document.getElementById("book-title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
Book.getBooks = function() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};
//display books
Book.displayBooks = function() {
  const books = Book.getBooks();
  books.forEach(function(book) {
    Book.addBookToList(book);
  });
};
Book.addBook = function(book) {
  const books = Book.getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};
Book.removeBook = function(isbn) {
  const books = Book.getBooks();
  books.forEach(function(book, index) {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
};

//DOM load Event
document.addEventListener("DOMContentLoaded", Book.displayBooks);
//Event Listeners
document.querySelector("form").addEventListener("submit", function(e) {
  //Get form values
  const title = document.getElementById("book-title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //create book
  const book = new Book(title, author, isbn);
  //Add book to list
  if (title === "" || author === "" || isbn === "") {
    Book.showAlert("Please fill in all fields", "error");
  } else {
    //add book to list
    Book.addBookToList(book);

    //Add to LS
    Book.addBook(book);
    //show success
    Book.showAlert("Book added", "success");
    // clear books
    Book.clearField();
  }
  e.preventDefault();
});
//Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  //delete book
  Book.deleteBook(e.target);

  //Remove book from LS
  Book.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});
