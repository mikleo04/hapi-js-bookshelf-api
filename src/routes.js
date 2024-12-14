import { addBookHandler, getAllBooksHandler } from './hanlder.js';

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
];

export default routes;