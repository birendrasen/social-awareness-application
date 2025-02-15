const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { getBusinessesByOwnerId } = require('../controllers/businessController');

// Create a new business
router.post('/', businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);

// Get businesses by owner ID
router.get('/:ownerId', businessController.getBusinessesByOwnerId);

// Update a business by ID
router.put('/:id', businessController.updateBusiness);

// Delete a business by ID
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;
