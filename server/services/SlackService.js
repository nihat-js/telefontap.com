const axios = require('axios');
const config = require('../config');

const sendSlackNotification = async (message) => {
  try {
    await axios.post(config.slackWebhookUrl, {
      text: message,
    });
    console.log('Notification sent to Slack:', message);
  } catch (error) {
    console.error('Error sending notification to Slack:', error);
  }
};

module.exports = {
  sendSlackNotification,
};
