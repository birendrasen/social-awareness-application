import React, { useState } from 'react';
import { User, Calendar, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import { Button } from './ui/button';
import { BASE_URL } from '../lib/utils';

const CampaignCard = ({ campaign, currentUserId }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const handleJoinCampaign = async () => {
    try {
      setIsJoining(true);

      const response = await fetch(BASE_URL+'/api/campaign-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaign_id: campaign._id,
          user_id: currentUserId,
          role: 'member'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to join campaign');
      }

      const data = await response.json();
      setIsMember(true);
      alert("Successfully joined the campaign!");

    } catch (error) {
      alert("Failed to join campaign. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{campaign.title}</CardTitle>
        <div className="text-sm text-gray-500">Category: {campaign.category}</div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4">{campaign.description}</p>
        {campaign.image_url && (
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-48 object-cover rounded-md"
          />
        )}
        
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{campaign.creator_id.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Ends: {new Date(campaign.end_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="flex items-center gap-1 text-gray-600">
            <ThumbsUp size={18} />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={18} />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        <Button
          onClick={handleJoinCampaign}
          disabled={isJoining || isMember}
          variant={isMember ? "secondary" : "default"}
        >
          {isJoining ? 'Joining...' : isMember ? 'Joined' : 'Join Campaign'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;