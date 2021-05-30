// initialize book object
class Book {
  constructor(name, author, numPages, read, id) {
    this.name = name;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = id;
  }
}

//set up library
const myLibrary = [];

//if a library exists in local storage, add it
if (window.localStorage.getItem("library")) {
  const localLibrary = JSON.parse(window.localStorage.getItem("library"));
  localLibrary.forEach((book) => {
    myLibrary.push(
      new Book(book.name, book.author, book.numPages, book.read, book.id)
    );
  });
}

const updateLocalStorage = () => {
  window.localStorage.setItem("library", JSON.stringify(myLibrary));
};

//render library to page
const renderLibrary = () => {
  const libraryTable = document.getElementById("libraryTable");
  libraryTable.innerHTML = "";
  myLibrary.forEach((book) => {
    libraryTable.innerHTML += `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.numPages}</td>
        <td>${book.read ? "Yes" : "No"}
        <td>
          <div class="manage-actions">
            <button class="btn btn-outline-danger" onClick="removeBook('${book.id.toString()}')">REMOVE</button>
            <button class="btn btn-outline-secondary" onClick="handleToggleRead('${book.id.toString()}')" >CHANGE READ STATUS</button>
          </div>
        </td>
    </tr>`;
  });
  if (myLibrary.length == 0) {
    console.log(myLibrary.length);
    const library = document.getElementById("library");
    library.setAttribute("style", "display:none");
  } else {
    library.setAttribute("style", "display:table");
  }
};

//instantiate library when page loads
renderLibrary();

// toggle read status prototype function
Book.prototype.toggleRead = function () {
  this.read ? (this.read = false) : (this.read = true);
  renderLibrary();
};

//toggle book read status
const handleToggleRead = (id) => {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary[index].toggleRead();
  updateLocalStorage();
};

//remove book from library
const removeBook = (id) => {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  renderLibrary();
  updateLocalStorage();
};

//hook into modal for JS use later
const addBookModal = new bootstrap.Modal(
  document.getElementById("addBookForm")
);

//add new book to library
document.getElementById("newBookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const numPages = document.getElementById("numberOfPages").value;
  const read =
    document.getElementById("read-status").value === "yes" ? true : false;

  //add the book onto the list of books
  myLibrary.push(new Book(name, author, numPages, read, uuidv4()));

  //hide the modal and render the library
  addBookModal.hide();
  renderLibrary();

  //clear the form
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("numberOfPages").value = "";

  //add to localstorage
  updateLocalStorage();
});
