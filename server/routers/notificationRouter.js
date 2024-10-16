const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = require('../config/db');

const router = express.Router();


router.get('/', getNotifications);
router.post('/', createNotification);
// router.get('/:id', getNotificationById);
// router.put('/:id', updateNotification);
// router.delete('/:id', deleteNotification);
router.put('/mark-all-read', markAllRead);


async function createNotification(req, res) {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: 'User ID and message are required.' });
  }

  try {
    const notification = await prisma.notification.create({
      data: { userId, message, read: false },
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating notification.' });
  }
};

async function getNotifications(req, res) {

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving notifications.' });
  }
};




const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.notification.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting notification.' });
  }
};

// Define routes


module.exports = router;
