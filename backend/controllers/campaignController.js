const Campaign = require('../models/Campaign');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
}).single('image');

// Create a new campaign
exports.createCampaign = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const campaignData = { ...req.body };

            // Convert image buffer to base64 if file was uploaded
            if (req.file) {
                const base64Image = req.file.buffer.toString('base64');
                campaignData.image_url = `data:${req.file.mimetype};base64,${base64Image}`;
            }

            // Parse dates
            if (campaignData.start_date) {
                campaignData.start_date = new Date(campaignData.start_date);
            }
            if (campaignData.end_date) {
                campaignData.end_date = new Date(campaignData.end_date);
            }

            // Parse target_goal
            if (campaignData.target_goal) {
                campaignData.target_goal = parseFloat(campaignData.target_goal);
            }

            const campaign = new Campaign(campaignData);
            await campaign.save();
            res.status(201).json(campaign);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const updateData = { ...req.body };

            // Convert new image to base64 if uploaded
            if (req.file) {
                const base64Image = req.file.buffer.toString('base64');
                updateData.image_url = `data:${req.file.mimetype};base64,${base64Image}`;
            }

            // Parse dates
            if (updateData.start_date) {
                updateData.start_date = new Date(updateData.start_date);
            }
            if (updateData.end_date) {
                updateData.end_date = new Date(updateData.end_date);
            }

            // Parse target_goal
            if (updateData.target_goal) {
                updateData.target_goal = parseFloat(updateData.target_goal);
            }

            const campaign = await Campaign.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );
            if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
            res.status(200).json(campaign);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};