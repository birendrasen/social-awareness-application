const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');

// Create a new advertisement
router.post('/', advertisementController.createAdvertisement);

// Get all advertisements
router.get('/', advertisementController.getAllAdvertisements);

// Get a specific advertisement by ID
router.get('/:id', advertisementController.getAdvertisementById);

// Update an advertisement by ID
router.put('/:id', advertisementController.updateAdvertisement);

// Delete an advertisement by ID
router.delete('/:id', advertisementController.deleteAdvertisement);

module.exports = router;
