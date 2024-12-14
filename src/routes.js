import { addBookHandler, getAllBooksHandler, getDeatilBookHandler } from './hanlder.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDeatilBookHandler
  },
];

export default routes;