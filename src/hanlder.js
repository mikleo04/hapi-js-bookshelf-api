import { nanoid } from 'nanoid';
import books from './books.js';
import CommonResponse from './common_response.js';
import Joi from '@hapi/joi';

const addBookHandler = (request, h) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
      'string.empty': 'Gagal menambahkan buku. Mohon isi nama buku'
    }),
    year: Joi.number().allow(null),
    author: Joi.string().allow(null),
    summary: Joi.string().allow(null),
    publisher: Joi.string().allow(null),
    pageCount: Joi.number().required(),
    readPage: Joi.number().required().max(Joi.ref('pageCount')).messages({
      'number.max': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }),
    reading: Joi.boolean().allow(null),
  });

  const { error } = schema.validate(request.payload);

  if (error) {
    return h.response({
      status: 'fail',
      message: error.details[0].message
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
      new CommonResponse('error', 'Buku gagal ditambahkan')
    ).code(500);
  }
};

const getAllBooksHandler = (request, h) => {
  const filteredBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
  return h.response(
    new CommonResponse('success', 'Buku berhasil didapatkan', { books: filteredBooks })
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

export { addBookHandler, getAllBooksHandler, getDeatilBookHandler };