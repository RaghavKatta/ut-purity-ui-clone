
# UT Purity Test

A web application implementing the University of Texas Purity Test - a classic college survey that lets users check off items they've never done to calculate their "purity" percentage.

## About the Project

The UT Purity Test is a self-assessment questionnaire that has circulated among college students for decades. This modern web implementation allows users to:

- Get an instant purity score (higher = more "pure")
- Optionally save their results anonymously
- Share their score with friends

## Features

- Clean, mobile-responsive design
- Real-time score calculation
- Anonymous data storage using Supabase
- Share functionality for social media

## Technologies Used

This project is built with:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui component library
- Supabase for database

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ut-purity-test.git
   cd ut-purity-test
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Deployment

This project can be deployed on any static site hosting platform like Netlify, Vercel, or GitHub Pages.

```
npm run build
```

The build files will be generated in the `dist` directory, which can be deployed to your hosting service of choice.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- University of Texas students for the original purity test questions
- The shadcn/ui team for the beautiful component library
- Supabase for the backend services
