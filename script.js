class Book{
  constructor(title, author, year, id){
    this.title = title;
    this.author = author;
    this.year = year;
    this.id = id;
  }
}

class library{
  constructor(libraryArray){
    this.libraryArray = libraryArray;
  };
  get libraryArray(){
    return this._libraryArray;
  };
  set libraryArray(value){
    this._libraryArray = value;
  };
  addBookToLibrary(book){
    this.libraryArray.push(book);
    return this.libraryArray;
  };
  deleteBook(bookId){
    for (let book of this.libraryArray) {
      if (book.id == bookId) {
        let filteredLibrary = this.libraryArray.filter(mybook => {return mybook !== book});
        console.log(filteredLibrary);
        return filteredLibrary;
      };
    };
    return this.libraryArray;
  }
  showLibrary(currentArray){
    for (let book of currentArray){
        const container = document.querySelector(".book-cards");

        //Create new card
        const myBookCard = document.createElement("div");
        myBookCard.classList.add("card");
        myBookCard.setAttribute("id", book.id);

        //Add attributes to the cards
        const title_p = document.createElement("p");
        const author_p = document.createElement("p");
        const year_p = document.createElement("p");
        title_p.classList.add("titleP");
        author_p.classList.add("authorP");
        year_p.classList.add("yearP");
        title_p.innerText = `${book.title}`;
        author_p.innerText = `Author: ${book.author}`;
        year_p.innerText = `Release: ${book.year}`;

        //Add read and delete button
        const cardBtnDiv = document.createElement("div");
        cardBtnDiv.classList.add("card-btn-div");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add(`delete-btn-${book.id}`);
        deleteBtn.textContent = "Delete Book";

        const readBtn = document.createElement("button");
        readBtn.classList.add("read-btn");
        readBtn.classList.add(`read-btn-${book.id}`);

        readBtn.textContent = "Read?";

        cardBtnDiv.appendChild(readBtn);
        cardBtnDiv.appendChild(deleteBtn);

        const readStatus = document.createElement("p");
        readStatus.classList.add(`read-status-${book.id}`);
        readStatus.classList.add("read-p");
        readStatus.classList.add("read");

        readStatus.textContent = "Status: Read";

        //Append to current bookcard
        myBookCard.appendChild(title_p);
        myBookCard.appendChild(author_p);
        myBookCard.appendChild(year_p);
        myBookCard.appendChild(cardBtnDiv);
        myBookCard.appendChild(readStatus);
        console.log(readStatus);

        //Append card to grid
        container.appendChild(myBookCard);
        //Add EventListeners
        readBtn.addEventListener("click", (e) => {
          console.log(readBtn);
          let cardId = e.target.parentNode.parentNode.id;
          let readP = document.querySelector(`.read-status-${cardId}`);
          readP.classList.toggle("read");
          console.log(readP);
          let isRead = readP.classList.contains("read");
          console.log(isRead);
          switch (isRead){
            case true:
              readP.textContent = "Status:Read";
              break;
            case false:
              readP.textContent = "Status: Not Read";
              break;
            default:
              readP.textContent = "Status: No info";
          }
        })

        deleteBtn.addEventListener("click", (e) => {
          let bookId = e.target.parentNode.parentNode.id;
          console.log(bookId)
          this.libraryArray = this.deleteBook(bookId);
          document.getElementById(`${bookId}`).remove();
          console.log(this.libraryArray);
        })
      }
  }
}

const book1 = new Book("War & Peace", "Lew Tolstoi", 1869, 0);
const book2 = new Book("The Firm", "John Grisham", 1991, 1);
const book3 = new Book("Crime & Punishment", "Fyodor Dostojevsky", 1866, 2);
let myLibrary = new library([book1, book2, book3]);

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".new-book-btn");
const cancelBtn = document.querySelector("#cancel-form-btn");
const submitFormBtn = document.querySelector("#submit-form-btn");

myLibrary.showLibrary(myLibrary.libraryArray);
let readBtns = document.querySelectorAll(".read-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");

addBookBtn.addEventListener("click", (e) => {dialog.showModal();});
submitFormBtn.addEventListener("click", (e) => {
    const title = document.querySelector("#input-title");
    const author = document.querySelector("#input-author");
    const year = document.querySelector("#input-year");
    const id = myLibrary.libraryArray.slice(-1)[0].id + 1;
    const book = new Book(title.value, author.value, year.value, id);
    myLibrary.libraryArray = myLibrary.addBookToLibrary(book);
    myLibrary.showLibrary([book]);
    readBtns = document.querySelectorAll(".read-btn");
    deleteBtns = document.querySelectorAll(".delete-btn");
    dialog.close();
  });