const express = require('express');
const router = express.Router();
const campaignMemberController = require('../controllers/campaignMemberController');

// Add a member to a campaign
router.post('/', campaignMemberController.addMember);

// Get all members of a campaign
router.get('/:campaignId', campaignMemberController.getMembersByCampaignId);

// Update a member's details
router.put('/:id', campaignMemberController.updateMember);

// Remove a member from a campaign
router.delete('/:id', campaignMemberController.removeMember);

module.exports = router;
