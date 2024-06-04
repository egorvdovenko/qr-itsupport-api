const process = require('process');
const axios = require('axios');

const broadcastMessage = async (message) => {
  try {
    const response = await axios.post(`${process.env.WEBSOCKET_SERVER_URL}/broadcast`, {
      message
    });
    return response.data;
  } catch (error) {
    console.error('Error broadcasting message to WebSocket server:', error);
    throw error;
  }
};

module.exports = {
  broadcastMessage
};
