const TabView = ({ activeTab, setActiveTab }) => (
    <div className="border-b">
      <div className="flex px-4">
        {['Events', 'Communities'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
  
  export default TabView;