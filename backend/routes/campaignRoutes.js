const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Route to create a campaign
router.post('/', campaignController.createCampaign);

// Route to get all campaigns
router.get('/', campaignController.getAllCampaigns);

// Route to get a specific campaign by ID
router.get('/:id', campaignController.getCampaignById);

// Route to update a campaign
router.put('/:id', campaignController.updateCampaign);

// Route to delete a campaign
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router;