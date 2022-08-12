const books = require("../models/book.model");

// API menyimpan buku
const createBook = (request, h) => {

}

// API mendapatkan seluruh buku
const getBooks = () => ({
    status: 'success',
    data: {
        books,
    },
});

// API mendapatkan detail buku
const getBook = (request, h) => {

}

// API mengubah data buku
const updateBook = (request, h) => {

}

// API menghapus data buku
const deleteBook = (request, h) => {

}

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
}