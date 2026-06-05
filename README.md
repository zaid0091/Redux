# MediaSearch

A responsive React + Vite media discovery app with a premium Pinterest-inspired card experience.

Users can search photos, videos, and GIFs, then save favorites to a local collection backed by `localStorage`.

## Features

- Search media across multiple sources
- Tabbed media explorer: Photos, Videos, GIFs
- Save items to a local collection page
- Pinterest-style premium cards for saved content
- Route-based page loading with React Router
- Local persistence using `localStorage`
- Responsive layout with Tailwind CSS

## Technologies

- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- React Toastify

## Setup

### Prerequisites

- Node.js 20+ or compatible runtime
- npm

### Install

```bash
npm install
```

### Environment Variables

This project uses environment variables for API keys.
Create a `.env` file at the project root and add:

```env
VITE_UNSPLASH_KEY=your_unsplash_api_key
VITE_PEXELS_KEY=your_pexels_api_key
VITE_GIPHY_KEY=your_giphy_api_key
```

> Important: `.env` is ignored by git. Do not commit your API keys.

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal to use the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project structure

- `src/` — application code
- `src/api/` — API helpers
- `src/components/` — reusable UI components
- `src/pages/` — route views
- `src/redux/` — Redux store and slices

## Notes

- Saved collection items are persisted in browser `localStorage`
- Collection page image handling is normalized for legacy saved data
- If you accidentally push `.env`, remove it from git tracking and keep it local

## License

This project is available under the [MIT License](LICENSE) if you wish to add one.
