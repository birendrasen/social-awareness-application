import React, { useState } from 'react';
import { User, LogOut, Bell, Search, PlusCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';



// Advertisement Card Component
const AdvertisementCard = ({ ad }) => {
  return (
    <Card className="mb-4 bg-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{ad.title}</span>
          <span className="text-sm text-blue-600">Sponsored</span>
          <p className="text-blue-700">{ad.business_id?.name}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>

        <p className="text-gray-700">{ad.content}</p>
      </CardContent>
      <CardFooter>
        <a href={ad.website} className="text-blue-600 hover:text-blue-700">
          Learn More
        </a>
      </CardFooter>
    </Card>
  );
};

export default AdvertisementCard;