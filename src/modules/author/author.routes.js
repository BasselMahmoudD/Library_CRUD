

import {Router} from 'express'
import { addAuthor, deleteAuthor, getAllAuthor, getAuthorById, searchAuthors, updateAuthor } from './author.controller.js'


export let authorRouter = Router()

authorRouter.get('/search', searchAuthors)
authorRouter.route('/').post(addAuthor).get(getAllAuthor)
authorRouter.route('/:id').get(getAuthorById).patch(updateAuthor).delete(deleteAuthor)