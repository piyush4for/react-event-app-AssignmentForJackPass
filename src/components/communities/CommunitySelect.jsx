import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CommunitySelect = ({ value, onChange, communities, setCommunities }) => {
  const [newCommunity, setNewCommunity] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (newCommunity.trim()) {
      setCommunities([...communities, newCommunity.trim()]);
      onChange(newCommunity.trim());
      setNewCommunity('');
      setIsCreating(false);
    }
  };

  return (
    <div className="relative">
      {!isCreating ? (
        <>
          <select
            value={value}
            onChange={(e) => {
              if (e.target.value === 'create-new') {
                setIsCreating(true);
              } else {
                onChange(e.target.value);
              }
            }}
            className="w-full p-3 border rounded-full appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {communities.map((community) => (
              <option key={community} value={community}>
                {community}
              </option>
            ))}
            <option value="create-new">+ Create New Community</option>
          </select>
          <ChevronDown 
            size={20} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
          />
        </>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCommunity}
            onChange={(e) => setNewCommunity(e.target.value)}
            placeholder="Enter community name"
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-4 py-2 border rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunitySelect;