const Business = require('../models/Business');
const mongoose = require('mongoose');

exports.createBusiness = async (req, res) => {
    try {
        console.log(req.body);
        const business = new Business(req.body);
        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get businesses by owner ID
exports.getBusinessesByOwnerId = async (req, res) => {
    try {
      const { ownerId } = req.params;
  
      // Validate ownerId format
      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        return res.status(400).json({ error: 'Invalid owner ID format' });
      }
  
      // Fetch businesses related to the owner
      const businesses = await Business.find({ owner_id: ownerId });
  
      if (!businesses.length) {
        return res.status(404).json({ message: 'No businesses found for this user.' });
      }
  
      res.status(200).json(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      res.status(500).json({ error: 'An internal server error occurred while fetching businesses.' });
    }
};
  

exports.updateBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!business) return res.status(404).json({ error: 'Business not found' });
        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) return res.status(404).json({ error: 'Business not found' });
        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
