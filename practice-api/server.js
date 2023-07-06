const express = require("express");
const app = express();
const port = 4000;
const { v4: uuidv4 } = require("uuid");

let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

// Middleware to parse JSON bodies
app.use(express.json());

//list all books
app.get("/books", (req, res) => {
  res.send(books);
});

// Get a specific book
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((job) => books.id === bookId);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

app.post("/books", (req, res) => {
  let uuid4 = uuidv4();
  let id = uuid4.substring(0, 2);
  const newBook = {
    ...req.body,
    id: id,
  };
  console.log("newBook", newBook);
  books.push(newBook);
  res.send(newBook);
});

// Update a specific book
app.patch("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookUpdates = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  const updatedBook = { ...books[bookIndex], ...bookUpdates };
  if (bookIndex !== -1) {
    books[bookIndex] = updatedBook;
    res.send(updatedBook);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

// Delete a specific book
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "book not found" });
  }
});

app.listen(port, () => {
  console.log("server is running at http://localhost:${port}");
});
