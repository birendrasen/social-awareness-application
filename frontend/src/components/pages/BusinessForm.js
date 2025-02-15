import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../lib/utils';

const BusinessForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const submitForm = async (data) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('user')); 

      // Check if userData exists and get the _id
      const ownerId = userData ? userData._id : null; 

      if (!ownerId) {
        throw new Error('User ID not found in local storage.');
      }

      // Add the owner_id to the form data
      const formData = { ...data, owner_id: ownerId };
      console.log(formData);

      
      const response = await axios.post(BASE_URL+'/api/businesses', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response){
        console.log('Business created:', response.data);
      }

      console.error('Error creating Business');

      // Redirect after successful submission
      navigate('/advertisement-form');
      
    } catch (error) {
      console.error('Error:', error);
      setSubmissionError(error.response?.data?.message || error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    navigate('/advertisement-form'); 
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pt-80">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="pt-20 bg-white shadow-md rounded-lg p-6 space-y-2 border border-gray-300 mt-4"
        style={{ minWidth: '500px' }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={handleCloseForm}
            className="absolute top-1 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register('name', { required: 'Business name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-4 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            {...register('description')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Info</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register('contact_info')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register('website')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register('category')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register('location')}
          />
        </div>

        {submissionError && (
          <p className="text-red-500 text-sm mt-2">{submissionError}</p>
        )}

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Business'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;