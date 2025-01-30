import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CommunitySelect from '../communities/CommunitySelect';
import { Image as ImageIcon, X } from 'lucide-react';
import { resizeMedia } from '../../utils/mediaUtils';

const CreateEventForm = ({ setShowCreateForm, events, setEvents, communities, setCommunities }) => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: new Date(),
        endDate: new Date(),
        location: '',
        description: '',
        community: communities[0] || '',
        media: null,
        mediaType: null
      });

    const handleMediaChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
        try {
        const mediaData = await resizeMedia(file);
        setFormData({ 
            ...formData, 
            media: mediaData,
            mediaType: file.type.startsWith('video/') ? 'video' : 'image'
        });
        } catch (error) {
        console.error('Error processing media:', error);
        }
    }
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, formData]);
    setShowCreateForm(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.readAsDataURL(file);
      });
      setFormData({ ...formData, image: dataUrl });
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setShowCreateForm(false)}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">Create New Event</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center">
          {formData.media ? (
            <div className="relative w-full aspect-4/5">
              {formData.mediaType === 'video' ? (
                <video
                  src={formData.media}
                  className="w-full h-full object-cover rounded-lg"
                  controls
                />
              ) : (
                <img 
                  src={formData.media} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  type="button"
                  className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center transition-transform hover:scale-105"
                  onClick={() => document.getElementById('mediaInput').click()}
                >
                  <ImageIcon size={20} className="mr-2" />
                  Replace
                </button>
                <button
                  type="button"
                  className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center transition-transform hover:scale-105"
                  onClick={() => setFormData({...formData, media: null, mediaType: null})}
                >
                  <X size={20} className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="flex flex-col items-center p-6 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => document.getElementById('mediaInput').click()}
            >
              <ImageIcon size={40} className="text-gray-400 mb-2" />
              <span className="text-gray-600">Add Photo or Video</span>
            </button>
          )}
          <input
            id="mediaInput"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Community
            </label>
            <CommunitySelect
              value={formData.community}
              onChange={(value) => setFormData({ ...formData, community: value })}
              communities={communities}
              setCommunities={setCommunities}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starts
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              showTimeSelect
              dateFormat="EEE, dd MMM 'at' h:mm aa"
              className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ends
            </label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              showTimeSelect
              dateFormat="EEE, dd MMM 'at' h:mm aa"
              className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add a brief description to let attendees know what your event is all about"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;