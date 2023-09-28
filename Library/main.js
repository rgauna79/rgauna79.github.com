// User Interface
const addBookBtn = document.getElementById('add-btn')
const addBookModal = document.getElementById('addModal');
const overlay = document.getElementById('overlay');
const addBookForm = document.getElementById('addBookForm');

//Data Structure

let  myLibrary = [];


class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
}

//Get Books from Local Storage
if (localStorage.getItem('books') === null) {
  myLibrary = []
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}

//Get Data from form
const getBookFromInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;
  
  return new Book(title, author, pages, isRead)
}

//Add book to library
const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();
  
  myLibrary.push(newBook);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  updateLibrary();
  closeAddBookModal();
}

//Loop in library and display books
const updateLibrary = () => {
  const bookList = document.querySelector('#table-body');
  bookList.textContent = '';
  
  for (let i = 0; i < myLibrary.length; i++){
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.append(bookRow);
    
    //Book title
    const bookTitle = document.createElement('td');
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    
    //Book author
    const bookAuthor = document.createElement('td');
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
    
    //Book pages
    const bookPages = document.createElement('td');
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);
    
    //Readed status
    const bookStatus = document.createElement('td');
    if (myLibrary[i].isRead === true){
      bookStatus.textContent = "Readed";
    } else {
      bookStatus.textContent = "Not Readed";
    }
    bookRow.appendChild(bookStatus);
    
    //Actions Buttons
    const bookDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn-delete");
  deleteButton.addEventListener('click', function() {
      deleteBook(i);
    });
    bookDelete.appendChild(deleteButton);
    bookRow.appendChild(bookDelete);
    
     
  }
}

//Modal actions
const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
}

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
}

//Delete book from table
const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  updateLibrary();
  
} 

//Listeners
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
addBookForm.onsubmit = addBook;

//Update library on load
updateLibrary();
