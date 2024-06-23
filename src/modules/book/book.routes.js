import { addBook, deleteBook, getAllBooks, getBooksById, searchBooks, updateBook } from "./book.controller.js";

import {Router} from 'express'


export let bookRouter = Router()
bookRouter.get('/search', searchBooks); 
bookRouter.route('/').post(addBook).get(getAllBooks)
bookRouter.route('/:id').get(getBooksById).patch(updateBook).delete(deleteBook)

