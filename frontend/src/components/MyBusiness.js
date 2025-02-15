import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../lib/utils";

const MyBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user ID from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const ownerId = userData ? userData._id : null;

    if (ownerId) {
      // Make a GET request to fetch businesses related to the user
      axios
        .get(`${BASE_URL}/api/businesses/${ownerId}`) 
        .then((response) => {
          // Set the businesses state with the fetched data
          setBusinesses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching businesses:", error);
        });
    }
  }, []);

  const handleCreateBusiness = () => {
    navigate("/business-form"); // Navigate to the Business Form page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Businesses</h1>
        <button
          onClick={handleCreateBusiness}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Business
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <h2>Your Businesses</h2>
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <Card key={business._id}>
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{business.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contact: {business.contact_info}</p>
                <p>Website: <a href={business.website} target="_blank" rel="noopener noreferrer">{business.website}</a></p>
                <p>Category: {business.category}</p>
                <p>Location: {business.location}</p>
              </CardContent>
              <CardFooter>
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBusiness;
