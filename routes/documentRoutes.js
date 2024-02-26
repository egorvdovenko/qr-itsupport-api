const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', authMiddleware, documentController.getAllDocuments);
router.get('/:id', authMiddleware, documentController.getDocumentById);
router.post('/', authMiddleware, documentController.createDocument);
router.put('/:id', authMiddleware, documentController.updateDocument);
router.delete('/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;
