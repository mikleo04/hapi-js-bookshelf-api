import { addBookHandler } from './hanlder.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
];

export default routes;