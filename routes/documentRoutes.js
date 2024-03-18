const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', [authMiddleware, roleMiddleware], documentController.getAllDocuments);
router.get('/:id', [authMiddleware, roleMiddleware], documentController.getDocumentById);
router.post('/', [authMiddleware], documentController.createDocument);
router.put('/:id', [authMiddleware, roleMiddleware], documentController.updateDocument);
router.delete('/:id', [authMiddleware, roleMiddleware], documentController.deleteDocument);

module.exports = router;
