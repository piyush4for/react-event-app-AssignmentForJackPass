# Event App

A React application for managing community events with features for creating, viewing, and organizing events by communities.

## Key Features

- Create and manage events with media uploads (images/videos)
- Organize events by communities
- Create new communities on-the-fly
- Persistent storage using localStorage
- Responsive design using Tailwind CSS

## Tech Stack

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon components
- **React DatePicker** - Date/time selection component
- **Vite** - Build tool and development server

## Implementation Details

- Uses [`useLocalStorage`](src/hooks/useLocalStorage.js) custom hook for persistent data storage
- Media handling with [`resizeMedia`](src/utils/mediaUtils.js) utility for image/video processing
- Component-based architecture with separate views for events and communities
- Responsive design supporting both mobile and desktop layouts

## Getting Started

1. Install dependencies:
```sh
npm install
```
2. Start:
```sh
npm run dev
```

3. Build for production:
```sh
npm run build
```

## Project structure:
src/
  ├── components/           # React components
  │   ├── communities/     # Community-related components
  │   └── events/         # Event-related components
  ├── hooks/              # Custom React hooks
  ├── utils/              # Utility functions
  └── App.jsx            # Main application component

  ## Challenges Faced

### Media Aspect Ratio Management

One significant challenge I encountered was maintaining consistent 4:5 aspect ratios for both images and videos across different screen sizes. Initially, media elements would stretch or compress unpredictably, especially on mobile devices.

**Solution:** Implemented a combination of Tailwind CSS classes and canvas api:
- Used `aspect-[4/5]` for consistent ratio
- Applied `object-cover` to prevent distortion
- Added `w-full` with responsive breakpoints

```jsx
<img 
  src={event.media} 
  className="w-full aspect-[4/5] object-cover"
  alt={event.title}
/>