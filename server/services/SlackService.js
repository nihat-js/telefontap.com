const axios = require('axios');
// const config = require('../config');
// 
class SlackService {
  constructor() {

    this.webhookUrl = process.SLACK_WEBHOOK_URL;
  }

  async sendNotification(message) {
    try {
      const response = await axios.post(this.webhookUrl, { text: message });
      console.log('Notification sent to Slack:', response.data);
    } catch (error) {
      console.error('Error sending notification to Slack:', error);
      throw new Error('Slack notification failed');
    }
  }

  // You can add more methods as needed, for example:
  async sendFormattedNotification(title, body) {
    const message = `*${title}*\n${body}`;
    await this.sendNotification(message);
  }

  async sendAttachmentNotification(title, text, attachmentUrl) {
    const message = {
      text: title,
      attachments: [
        {
          text: text,
          image_url: attachmentUrl,
          fallback: 'Image not available',
        },
      ],
    };
    try {
      await axios.post(this.webhookUrl, message);
      console.log('Attachment notification sent to Slack');
    } catch (error) {
      console.error('Error sending attachment notification to Slack:', error);
      throw new Error('Slack attachment notification failed');
    }
  }
}

// Exporting an instance of the SlackService
// const slackServiceInstance = new SlackService(config.slackWebhookUrl);
const instance = new SlackService()
instance.sendNotification("bas")
// module.exports = slackServiceInstance;
