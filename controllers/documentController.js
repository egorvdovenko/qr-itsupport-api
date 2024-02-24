const Document = require('../models/document');

const getAllDocuments = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows: documents } = await Document.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });

    res.json({
      totalItems: count,
      items: documents,
    });
  } catch (error) {
    console.error(error);
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
