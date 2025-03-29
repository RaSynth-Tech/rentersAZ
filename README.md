# RenterAZ - Your One-Stop Platform for Renting Items

RenterAZ is a modern web application that allows users to rent and list items for rent. Built with Next.js, Material-UI, and TypeScript, it provides a seamless experience for both renters and item owners.

## Features

- 🔐 Secure authentication with Google OAuth
- 🎨 Modern UI with Material-UI components
- 🌓 Light/Dark mode support
- 📱 Fully responsive design
- 🗺️ Location-based item search
- 💰 Easy rental process
- ⭐ Review and rating system
- 📊 User dashboard
- 📝 Item listing management
- 🔍 Advanced search and filtering

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/renteraz.git
cd renteraz
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

5. Start the production server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
renteraz/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── layout/
│   │   └── product/
│   ├── config/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── layout.tsx
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

RenterAZ Technologies Pvt Ltd
Electronic City Phase 1
Bangalore, Karnataka 560100
India

Email: contact@renteraz.com
Phone: +91-1234567890
