const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);
router.post('/', documentController.createDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
