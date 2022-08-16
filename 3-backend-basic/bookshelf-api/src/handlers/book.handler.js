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

// Fungsi untuk mendapatkan buku yang dicari berdasarkan key dari query parameters
const queryBooksWithSingleCondition = (key, filters) => {
    let results = [];
    switch (key) {
        case 'name':
            results = books.filter((b) => b.name.toLowerCase().indexOf(filters[key]) !== -1);
            break;
        case 'reading':
            results = books.filter((b) => b.reading === filters[key]);
            break;
        case 'finished':
            results = books.filter((b) => b.finished === filters[key]);
            break;
    }

    return results;
}

// Belum diimplementasikan --> PR
const queryBooksWithMultipleConditions = (filters) => {
    return books;
}

// Mengubah bentuk query parameter menjadi bentuk yang sesuai, misalkan reading=1 menjadi reading=true/false
const formattedConditions = (conditions) => {
    let newConditions = {};
    for (let key in conditions) {
        if (conditions.hasOwnProperty(key)) {
            if (key === 'name') {
                newConditions[key] = conditions[key].toLowerCase();
            } else if (key === 'reading' || key === 'finished') {
                newConditions[key] = conditions[key] === '1' ? true : false;
            }
        }
    }
    return newConditions;
}

// API mendapatkan seluruh buku
// API mendapatkan detail buku berdasarkan name, reading, finished 
const getBooks = (request, h) => {
    // Mengakses query parameter
    const params = request.query;
    // By default, params akan tampak seperti [Object: null prototype] {} --> jika tidak ada query parameter
    // Ada beberapa cara agar mengubahnya ke dalam bentuk {} saja
    const stringConditions = JSON.stringify(params)
    const filterConditions = JSON.parse(stringConditions)
    
    let resultBooks = [];

    // Cek apakah ada query paramaters?
    if (Object.keys(filterConditions).length === 1) { // Jika hanya 1 query parameter
        // Ubah ke dalam bentuk yang sesuai
        newFilterConditions = formattedConditions(filterConditions)
        console.log(newFilterConditions)
        resultBooks = queryBooksWithSingleCondition(Object.keys(newFilterConditions)[0], newFilterConditions);

    } else if (Object.keys(filterConditions).length > 1) { // Jika lebih dari 1 query parameter
        // Ubah ke dalam bentuk yang sesuai
        newFilterConditions = formattedConditions(filterConditions)
        console.log(newFilterConditions)
        resultBooks = queryBooksWithMultipleConditions(newFilterConditions);

    } else {
        // Jika tidak ada query parameters, mengembalikan semua data books
        resultBooks = books;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: resultBooks,
        },
    });
    response.code(200);
    return response;
}

// API mendapatkan detail buku
const getBookById = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
              book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}

// API mengubah data buku
const updateBookById = (request, h) => {
    const { bookId } = request.params;

    // Jika tidak ada property name pada request.body
    if (!request.payload.hasOwnProperty('name')) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    // Jika readPage > pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((b) => b.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

// API menghapus data buku
const deleteBookById = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((b) => b.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById,
}