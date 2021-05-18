function Book(name, author, numPages, read, id) {
  this.name = name;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
  this.id = id;
}

const myLibrary = [];

//render library to page
function renderLibrary() {
  const libraryTable = document.getElementById("libraryTable");
  libraryTable.innerHTML = "";
  myLibrary.forEach((book) => {
    libraryTable.innerHTML += `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.numPages}</td>
        <td>${book.read ? "Yes" : "No"}
        <td><button class="btn btn-danger" onClick="removeBook('${book.id.toString()}')">REMOVE</td>
    </tr>`;
  });
}

//remove book from library
const removeBook = (id) => {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  renderLibrary();
};

document.getElementById("newBookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const numPages = document.getElementById("numberOfPages").value;
  const read = document.getElementById("read-status").value;

  //add the book onto the list of books
  myLibrary.push(new Book(name, author, numPages, read, uuidv4()));
  console.log(myLibrary);

  //hide the modal and render the library
  $("#addBookForm").modal("hide");
  renderLibrary();

  //clear the form
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("numberOfPages").value = "";
});
