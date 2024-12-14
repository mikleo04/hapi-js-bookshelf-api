import { nanoid } from 'nanoid';
import books from './books.js';
import CommonResponse from './common_response.js';
import { validateBookPayload } from './validator.js';

const addBookHandler = (request, h) => {
  const customMessages = {
    nameRequiredMessage: 'Gagal menambahkan buku. Mohon isi nama buku',
    nameEmptyMessage: 'Gagal menambahkan buku. Mohon isi nama buku',
    readPageMaxMessage: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
  };

  const validation = validateBookPayload(request.payload, customMessages);

  if (!validation.isValid) {
    return h.response({
      status: 'fail',
      message: validation.message
    }).code(400);
  }

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response(
      new CommonResponse('success', 'Buku berhasil ditambahkan', { bookId: id })
    ).code(201);
  } else {
    return h.response(
      new CommonResponse('fail', 'Buku gagal ditambahkan')
    ).code(500);
  }
};

const getAllBooksHandler = (request, h) => {

  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }


  const coverBooks = filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }));
  return h.response(
    new CommonResponse('success', 'Buku berhasil didapatkan', { books: coverBooks })
  ).code(200);
};

const getDeatilBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined && book !== null) {
    return h.response(
      new CommonResponse('success', 'Buku berhasil didapatkan', { book })
    ).code(200);
  } else {
    return h.response(
      new CommonResponse('fail', 'Buku tidak ditemukan')
    ).code(404);
  }
};

const updateBookHandler = (request, h) => {
  const customMessages = {
    nameRequiredMessage: 'Gagal memperbarui buku. Mohon isi nama buku',
    nameEmptyMessage: 'Gagal memperbarui buku. Mohon isi nama buku',
    readPageMaxMessage: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
  };

  const validation = validateBookPayload(request.payload, customMessages);

  if (!validation.isValid) {
    return h.response({
      status: 'fail',
      message: validation.message
    }).code(400);
  }

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString()
    };

    return h.response(
      new CommonResponse('success', 'Buku berhasil diperbarui')
    ).code(200);
  } else {
    return h.response(
      new CommonResponse('fail', 'Buku tidak ditemukan')
    ).code(404);
  }
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return h.response(
      new CommonResponse('success', 'Buku berhasil dihapus')
    ).code(200);
  } else {
    return h.response(
      new CommonResponse('fail', 'Buku gagal dihapus. Id tidak ditemukan')
    ).code(404);
  }
};

export { addBookHandler, getAllBooksHandler, getDeatilBookHandler, updateBookHandler,  deleteBookHandler };