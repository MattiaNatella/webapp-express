import express from 'express'
import moviesControllers from '../controllers/moviesControllers.js'
import upload from '../middlewares/multer.js'
const router = express.Router()


//impostiamo le rotte

//index
router.get('/', moviesControllers.index)

//show
router.get('/:id', moviesControllers.show)

//storeReviews
router.post('/:id/reviews', moviesControllers.storeReview)

//storeFilms
router.post('/', upload.single('image'), moviesControllers.storeFilms)

export default router