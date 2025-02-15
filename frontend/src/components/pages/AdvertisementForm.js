import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {X} from 'lucide-react';
import axios from 'axios';
import {BASE_URL} from '../../lib/utils';

const AdvertisementForm = ({businesses, onCreate}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [selectedBusinessId, setSelectedBusinessId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("B ", businesses);

        let userId = '';
        if (localStorage.getItem('user')) {
            userId = JSON.parse(localStorage.getItem('user'))._id;
        }

        if (userId && businesses) {
            console.log(userId)
            const userBusinesses = businesses.filter(business => business.owner_id == userId);

            console.log("Bussinesss ", userBusinesses);

            setFilteredBusinesses(userBusinesses);
        }
    }, [businesses]);

    const handleBusinessChange = (e) => {
        setSelectedBusinessId(e.target.value);
    };

    const handleCloseForm = () => {
        navigate('/');
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            // Prepare the advertisement data according to the schema
            const advertisementData = {
                business_id: selectedBusinessId,
                start_date: data.start_date || null,
                end_date: data.end_date || null,
                budget: parseFloat(data.budget),
                title: data.title,
                content: data.content,
                status: data.status
            };


            // Send POST request to the API
            const response = await axios.post(
                BASE_URL + '/api/advertisements',
                advertisementData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            onCreate?.(response.data);
            handleCloseForm()
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create advertisement');
            }

            const result = await response.json();


            // Reset form and show success message
            reset();
            alert('Advertisement created successfully!');
            navigate('/advertisements'); // Adjust the route as needed
        } catch (error) {
            console.error('Error creating advertisement:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/3 pt-20 mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-300"
            style={{minWidth: '600px'}}
        >
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCloseForm();
                    }}
                    className="absolute top-0 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <X size={24} className="text-gray-600"/>
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Select Business</label>
                <select
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleBusinessChange}
                    value={selectedBusinessId}
                    required
                >
                    <option value="">Select a business</option>
                    {filteredBusinesses && filteredBusinesses.map((business) => (
                        <option key={business._id} value={business._id}>
                            {business.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...register('title', {required: 'Title is required'})}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    {...register('content', {required: 'Content is required'})}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...register('start_date')}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...register('end_date')}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <input
                    type="number"
                    step="0.01"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...register('budget', {
                        required: 'Budget is required',
                        min: {value: 0, message: 'Budget must be greater than 0'}
                    })}
                />
                {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    {...register('status', {required: 'Status is required'})}
                >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md transition-colors ${
                        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                >
                    {isSubmitting ? 'Creating Advertisement...' : 'Create Advertisement'}
                </button>
            </div>
        </form>
    );
};

export default AdvertisementForm;
