const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/', [authMiddleware], ticketController.getAllTickets);
router.get('/:id', [authMiddleware], ticketController.getTicketById);
router.get('/byUserId/:userId', [authMiddleware], ticketController.getTicketByUserId);
router.post('/', [authMiddleware], ticketController.createTicket);
router.put('/:id', [authMiddleware, roleMiddleware], ticketController.updateTicket);
router.delete('/:id', [authMiddleware, roleMiddleware], ticketController.deleteTicket);

module.exports = router;
