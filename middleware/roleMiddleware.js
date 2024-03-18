const UserRole = require('../enums/userRole')

const roleMiddleware = (req, res, next) => {
  if (req.user.userRole !== UserRole.USER) {
    res.status(403).json({ error: 'Forbidden' });
  } else {
    next();
  }
}

module.exports = roleMiddleware;