import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../lib/utils';

const CampaignForm = ({ onCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isVisible, setIsVisible] = useState(true);
  const creatorId = user?._id;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const formData = new FormData();

      // Log the image file to check its properties
      if (imageFile) {
        console.log('Image file:', imageFile);
        console.log('Image type:', imageFile.type);
        formData.append('image', imageFile);
      }

      // Add other fields
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('status', data.status || 'draft');
      formData.append('category', data.category || '');
      formData.append('target_goal', data.target_goal ? parseFloat(data.target_goal) : 0);
      if (creatorId) {
        formData.append('creator_id', creatorId);
      } else {
        console.error('Creator ID not found in local storage');
      }

      if (data.start_date) {
        formData.append('start_date', new Date(data.start_date).toISOString());
      }
      if (data.end_date) {
        formData.append('end_date', new Date(data.end_date).toISOString());
      }

      // Log the FormData to see what's being sent
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios
          .post(BASE_URL+'/api/campaigns',
              formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        onCreate?.(response.data);
        reset();
        setImagePreview(null);
        setImageFile(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      setSubmitError(
        error.response?.data?.error ||
        error.message ||
        'Failed to create campaign. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setIsVisible(false); 
  };

  if (!isVisible) {
    return null; 
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {submitError && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-300"
        style={{ minWidth: '400px', }}>
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCloseForm();
            }}
            className="absolute top-0 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
            rows="3"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
              {...register('status', { required: 'Status is required' })}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
              {...register('category')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
              {...register('start_date')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
              {...register('end_date')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Goal</label>
          <input
            type="number"
            className="mt-1 p-1.5 w-full border border-gray-300 rounded-md text-sm"
            {...register('target_goal', { required: 'Target Goal is required' })}
          />
          {errors.target_goal && <p className="text-red-500 text-xs">{errors.target_goal.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 p-1.5 w-full text-sm"
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <div className="mt-2 w-32 h-32 overflow-hidden rounded-md">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-1.5 px-4 bg-blue-600 text-white font-semibold rounded-md text-sm
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;