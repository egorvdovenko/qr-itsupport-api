const Document = require('../models/document');

const getAllDocuments = async (req, res) => {
  try {
    const { ticketId, page, pageSize } = req.query;

    const whereClause = ticketId ? { ticketId } : {};

    let options = { where: whereClause };
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      options.limit = parseInt(pageSize);
      options.offset = parseInt(offset);
    }

    const { count, rows: documents } = await Document.findAndCountAll(options);

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

    // TODO: think about base64String storing
    // TODO: think about secure access

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
