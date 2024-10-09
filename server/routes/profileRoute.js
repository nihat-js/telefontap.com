const express = require("express")

const router = express.Router()

router.post('/change-password', changePassword);
router.get('/security-settings', getSecuritySettings);
router.put('/security-settings', updateSecuritySettings);
router.get('/activity-log', getActivityLog);
router.get('/sessions', getUserSessions);
router.delete('/devices/:deviceId', removeDevice);


async function getUserProfile(req, res) {
  const userId = req.user.userId; // Assuming user ID is stored in req.user
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true }, // Adjust fields as necessary
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving profile', error });
  }
}

async function updateUserProfile(req, res) {
  const userId = req.user.userId;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile', error });
  }
}

// Change Password
async function changePassword(req, res) {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // Add password verification logic (hashing, comparison, etc.)
    const isValidPassword = /* your password verification logic */;

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    // Update password (make sure to hash it before saving)
    await prisma.user.update({
      where: { id: userId },
      data: { password: /* hashed newPassword */ },
    });

    return res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error changing password', error });
  }
}

// Get Security Settings
async function getSecuritySettings(req, res) {
  const userId = req.user.userId;

  try {
    const settings = await prisma.securitySettings.findUnique({
      where: { userId },
    });
    return res.json(settings);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving security settings', error });
  }
}

// Update Security Settings
async function updateSecuritySettings(req, res) {
  const userId = req.user.userId;
  const { twoFactorEnabled } = req.body;

  try {
    const updatedSettings = await prisma.securitySettings.update({
      where: { userId },
      data: { twoFactorEnabled },
    });
    return res.json(updatedSettings);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating security settings', error });
  }
}

// Get Activity Log
async function getActivityLog(req, res) {
  const userId = req.user.userId;

  try {
    const log = await prisma.activityLog.findMany({
      where: { userId },
    });
    return res.json(log);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving activity log', error });
  }
}

// Get User Sessions
async function getUserSessions(req, res) {
  const userId = req.user.userId;

  try {
    const sessions = await prisma.session.findMany({
      where: { userId },
    });
    return res.json(sessions);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving sessions', error });
  }
}

// Remove Device
async function removeDevice(req, res) {
  const userId = req.user.userId;
  const { deviceId } = req.params;

  try {
    await prisma.session.deleteMany({
      where: { userId, id: deviceId },
    });
    return res.json({ message: 'Device removed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing device', error });
  }
}
