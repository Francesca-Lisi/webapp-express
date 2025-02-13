const express = require('express')
const router = express.Router();

const movieController = require('../controllers/movieController')

router.get('/', movieController.index)
router.get('/:id', movieController.show)

//nuova recensione
router.post('/:id/reviews', movieController.storeReview)

//nuovo film con la gestione immagine (installare multer)
router.post('/', movieController.store)

module.exports = router;
