const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));


// Import routes
const authRoutes=require('./routes/authRoutes');
const campaignRoute = require('./routes/campaignRoutes');
const campaignMemberRoute = require('./routes/campaignMemberRoutes');
const businessRoute = require('./routes/businessRoutes');
const advertisementRoute = require('./routes/advertisementRoutes');
const commentRoute = require('./routes/commentRoutes');
const { getBusinessesByOwnerId } = require('./controllers/businessController');

//  routes
app.use('/api', authRoutes);
app.use('/api/campaigns', campaignRoute);
app.use('/api/campaign-members', campaignMemberRoute);
app.use('/api/businesses', businessRoute);
app.use('/api/businesses/:ownerId', getBusinessesByOwnerId);
app.use('/api/comments', commentRoute);
app.use('/api/advertisements', advertisementRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
