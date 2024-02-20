const Ticket = require('../models/ticket');
const Document = require('../models/document');
const Device = require('../models/device');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ include: ['documents', 'device'] });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await Ticket.findByPk(ticketId, { include: ['documents', 'device'] });

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
    const { title, description, deviceId, documents } = req.body;

    // Check if the device with the given deviceId exists
    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Create a new ticket with associated device
    const newTicket = await Ticket.create({
      title,
      description,
      deviceId,
    });

    // Create associated documents
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
    const { title, description, deviceId, documents } = req.body;

    // Check if the device with the given deviceId exists
    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const ticket = await Ticket.findByPk(ticketId, { include: 'documents' });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Update ticket fields
    ticket.title = title;
    ticket.description = description;
    ticket.deviceId = deviceId;
    await ticket.save();

    // Update associated documents
    if (documents && documents.length > 0) {
      await Document.destroy({ where: { ticketId } });

      const createdDocuments = await Document.bulkCreate(
        documents.map((doc) => ({ ...doc, ticketId }))
      );

      // Associate the updated documents with the ticket
      await ticket.setDocuments(createdDocuments);
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

    // Delete ticket
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
  createTicket,
  updateTicket,
  deleteTicket,
};
