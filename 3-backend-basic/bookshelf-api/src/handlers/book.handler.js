const books = require("../models/book.model");
const { nanoid } = require("nanoid");

// API menyimpan buku
const createBook = (request, h) => {
    
    // Jika tidak ada property name pada request.body
    if (!request.payload.hasOwnProperty('name')) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    // Jika readPage > pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
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