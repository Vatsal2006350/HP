const express = require('express');
const router = express.Router();

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await achievementService.getAllAchievements();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new achievement (admin only in production)
router.post('/', async (req, res) => {
  try {
    const achievement = await achievementService.createAchievement(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user achievements
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const achievements = await achievementService.getUserAchievements(userId);
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Award an achievement to a user
router.post('/award', async (req, res) => {
  try {
    const { userId, achievementId, walletAddress } = req.body;
    
    if (!userId || !achievementId) {
      return res.status(400).json({ error: 'User ID and Achievement ID are required' });
    }
    
    const result = await achievementService.awardAchievement(userId, achievementId, walletAddress);
    
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
