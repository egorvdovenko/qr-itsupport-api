const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');

    // Attach the user ID to the request for further use
    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
