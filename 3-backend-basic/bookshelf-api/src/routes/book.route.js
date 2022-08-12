const bookHandlers = require("../handlers/book.handler");

const router = [
  {
    method: "POST",
    path: "/books",
    handler: bookHandlers.createBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: bookHandlers.getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: bookHandlers.getBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: bookHandlers.updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: bookHandlers.deleteBook,
  },
];

module.exports = router;
