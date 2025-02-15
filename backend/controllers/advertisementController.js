const Advertisement = require('../models/Advertisement');


exports.createAdvertisement = async (req, res) => {
    try {
        console.log("Req body",req.body);
        const advertisement = new Advertisement(req.body);
        await advertisement.save();
        res.status(201).json(advertisement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await Advertisement.find();
        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdvertisementById = async (req, res) => {
    try {
        const advertisement = await Advertisement.findById(req.params.id);
        if (!advertisement) return res.status(404).json({ error: 'Advertisement not found' });
        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!advertisement) return res.status(404).json({ error: 'Advertisement not found' });
        res.status(200).json(advertisement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.findByIdAndDelete(req.params.id);
        if (!advertisement) return res.status(404).json({ error: 'Advertisement not found' });
        res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
