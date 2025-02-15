import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import AdvertisementCard from './AdvertisementCard';
import CampaignCard from './CampaignCard';
import AdvertisementForm from './pages/AdvertisementForm';
import CampaignForm from './pages/CampaignForm';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { BASE_URL } from '../lib/utils';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [activeForm, setActiveForm] = useState(null); // 'campaign' or 'advertisement'
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  // Fetch campaigns and advertisements
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const [campaignsRes, adsRes,busRes] = await Promise.all([
          axios.get(BASE_URL+'/api/campaigns', {
            
          }),

          axios.get(BASE_URL+'/api/advertisements', {
          }),
          axios.get(BASE_URL+'/api/businesses', {
          }),
        ]);

        setCampaigns(campaignsRes.data);
        setAdvertisements(adsRes.data);
        setBusinesses(busRes.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCampaign = (data) => {
    setCampaigns([...campaigns, data]);
    setActiveForm(null); // Close the form
  };

  const handleCreateAdvertisement = (data) => {
    setAdvertisements([...advertisements, data]);
    setActiveForm(null); // Close the form
  };
   const handelActiveFormClose = ()=>{
    setActiveForm(null);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1 relative">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveForm('campaign')}
                >
                  <PlusCircle size={20} />
                  <span>Create Campaign</span>
                </button>
                <button
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded"
                  onClick={() => setActiveForm('advertisement')}
                >
                  <PlusCircle size={20} />
                  <span>Create Advertisement</span>
                </button>
              </CardContent>
            </Card>

            {/* Advertisement Cards */}
            <div className="mt-4 space-y-4">
              <h1>Advertisements</h1>
              {advertisements.map((ad) => (
                <AdvertisementCard key={ad._id} ad={ad} />
              ))}
            </div>
          </div>


          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {/* Campaigns */}
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign._id} campaign={campaign} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Render the form based on activeForm */}
        {activeForm && (
          <div className="absolute inset-0 bg-gray bg-opacity-50 flex items-center justify-center z-50">
            <Dialog
              open={Boolean(activeForm)}
              onOpenChange={() => setActiveForm(null)}
              className="w-full max-w-lg"
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {activeForm === 'campaign' ? 'Create Campaign' : 'Create Advertisement'}
                  </DialogTitle>
                </DialogHeader>
                {activeForm === 'campaign' && (
                  <CampaignForm onCreate={handleCreateCampaign} />
                )}
                {activeForm === 'advertisement' && (
                  <AdvertisementForm close={handelActiveFormClose}  businesses={businesses} onCreate={handleCreateAdvertisement} />
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
