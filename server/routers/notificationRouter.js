const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


router.post('/', createNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);
router.put('/mark-all-read', markAllRead);


// 1. Create a new notification
const createNotification = async (req, res) => {
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

// 2. Retrieve all notifications for a user
const getNotifications = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving notifications.' });
  }
};

// 3. Retrieve a specific notification by ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving notification.' });
  }
};

// 4. Update a notification
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  try {
    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { read },
    });
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating notification.' });
  }
};

// 5. Delete a notification
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
