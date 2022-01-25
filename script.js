let myLibrary = [];

function buildLibrary() {
  resetLibrary();
  for (let book of myLibrary) {
    let div = document.createElement("div");
    div.classList.add("book");
    div.setAttribute("data-index", `${myLibrary.indexOf(book)}`);

    for (let prop in book) {
      if (prop != "read") {
        let subDiv = document.createElement("div");
        subDiv.textContent += `${prop.charAt(0).toUpperCase() + prop.slice(1)}: ${book[prop]}`;
        subDiv.classList.add("property");
        div.appendChild(subDiv);
      } else {
        console.log(book[prop]);
        div.appendChild(book[prop]);
      }

    }

    const deleteBtn = document.createElement("div");
    deleteBtn.textContent = "Remove Book";
    deleteBtn.classList.add("delete-book");
    deleteBtn.addEventListener("click", deleteBook);
    div.appendChild(deleteBtn);
    library.appendChild(div);
  }
}

const submit = document.querySelector(".submit");
const addBook = document.querySelector(".add-book");
const library = document.querySelector(".library");
submit.addEventListener("click", addBookToLibrary);
addBook.addEventListener("click", openForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const titleValue = document.getElementById("book-title").value;
  const authorValue = document.getElementById("book-author").value;
  const pagesValue = document.getElementById("book-pages").value;
  const readBtn = document.createElement("div");
  const notReadBtn = document.createElement("div");

  readBtn.addEventListener("click", toggleRead);
  notReadBtn.addEventListener("click", toggleRead);

  let readValue;
  if(document.getElementById("have-read").checked) {
    readBtn.textContent = "Read";
    readBtn.classList.add("read-button");
    readValue = readBtn;
  } else {
    notReadBtn.textContent = "Not Read";
    readBtn.classList.add("not-read-button");
    readValue = notReadBtn;
  }

  const newBook = new Book(titleValue, authorValue, pagesValue, readValue)
  console.table(newBook);
  myLibrary.push(newBook);
  buildLibrary();
  closeForm();
}

function openForm() {
  document.querySelector(".book-input").style.display = "block";
  document.querySelector(".add-book-container").style.display = "none";
}

function closeForm() {
  document.querySelector(".book-input").style.display = "none";
  document.querySelector(".add-book-container").style.display = "flex";
}

function resetLibrary() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

function deleteBook(e) {
  myLibrary.splice(e.target.parentNode.dataset.index, 1);
  buildLibrary();
}

function toggleRead(e) {
  if(e.target.classList.contains("read-button")) {
    e.target.classList.remove("read-button");
    e.target.classList.add("not-read-button");
    e.target.textContent = "Not Read";
  } else {
    e.target.classList.remove("not-read-button");
    e.target.classList.add("read-button");
    e.target.textContent = "Read";
  }
}