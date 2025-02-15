const CampaignMember = require('../models/CampaignMember');

exports.addMember = async (req, res) => {
    try {
        const member = new CampaignMember(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMembersByCampaignId = async (req, res) => {
    try {
        const members = await CampaignMember.find({ campaignId: req.params.campaignId });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const member = await CampaignMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!member) return res.status(404).json({ error: 'Member not found' });
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeMember = async (req, res) => {
    try {
        const member = await CampaignMember.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ error: 'Member not found' });
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
