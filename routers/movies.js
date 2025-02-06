import express from 'express'
import moviesControllers from '../controllers/moviesControllers.js'
const router = express.Router()


//impostiamo le rotte

//index
router.get('/', moviesControllers.index)

//show
router.get('/:id', moviesControllers.show)

export default router