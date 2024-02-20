const Document = require('../models/document');

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createDocument = async (req, res) => {
  try {
    const { title, base64String } = req.body;
    const newDocument = await Document.create({
      title,
      base64String,
    });
    res.status(201).json(newDocument);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const document = await Document.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const { title, base64String } = req.body;
    const document = await Document.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Update document fields
    document.title = title;
    document.base64String = base64String;
    await document.save();

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const document = await Document.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete document
    await document.destroy();

    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
