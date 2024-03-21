const Ticket = require('../models/ticket');
const Document = require('../models/document');
const Device = require('../models/device');
const User = require('../models/user');

const getAllTickets = async (req, res) => {
  try {
    const { userId, page = 1, pageSize = 10, includeDevice, includeDocuments } = req.query;
    const offset = (page - 1) * pageSize;

    const whereClause = userId ? { userId } : {};

    const include = [];
    if (includeDevice === 'true') {
      include.push({ model: Device, as: 'device' });
    }
    if (includeDocuments === 'true') {
      include.push({ model: Document, as: 'documents' });
    }

    const { count, rows: tickets } = await Ticket.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      include: include,
    });

    res.json({
      totalItems: count,
      items: tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ticket = await Ticket.findOne({
      where: { userId },
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTicket = async (req, res) => {
  try {
    const { title, description, deviceId, documents, isDone, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (deviceId) {
      const device = await Device.findByPk(deviceId);
      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }
    }

    const newTicket = await Ticket.create({
      title,
      description,
      isDone: !!isDone,
      userId,
      deviceId: deviceId || null,
    });

    // Create associated documents if documents are provided
    if (documents && documents.length > 0) {
      const createdDocuments = await Document.bulkCreate(
        documents.map((doc) => ({ ...doc, ticketId: newTicket.id }))
      );

      // Associate the documents with the ticket
      await newTicket.setDocuments(createdDocuments);
    }

    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const { title, description, deviceId, documents, isDone, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (deviceId) {
      const device = await Device.findByPk(deviceId);
      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }
    }

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.title = title;
    ticket.description = description;
    ticket.isDone = !!isDone;
    ticket.userId = userId;
    ticket.deviceId = deviceId || null;
    await ticket.save();

    // Update associated documents
    if (documents) {
      // Remove all existing documents associated with the ticket
      await Document.destroy({ where: { ticketId } });

      if (documents.length > 0) {
        // Create and associate new documents if documents array is not empty
        const createdDocuments = await Document.bulkCreate(
          documents.map((doc) => ({ ...doc, ticketId }))
        );

        await ticket.setDocuments(createdDocuments);
      }
    } else {
      // If documents array is not provided, remove all existing documents
      await Document.destroy({ where: { ticketId } });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Delete associated documents before deleting the ticket
    await Document.destroy({ where: { ticketId } });

    await ticket.destroy();

    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketByUserId,
  createTicket,
  updateTicket,
  deleteTicket,
};
