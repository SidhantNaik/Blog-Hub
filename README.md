# Blog-Hub

## Description

Blog-Hub is a comprehensive blogging platform that enables users to create, share, and interact with blog content. Built with a modern tech stack, it features a robust authentication system, rich text editing, category management, and interactive commenting. The platform demonstrates full-stack development practices with separate client and server architectures, real-time updates, and responsive design principles.

## Features

- **User Authentication**
  - Email & Password authentication
  - Google Sign-in integration
  - Protected routes for authenticated users

- **Blog Management**
  - Create, edit, and delete blog posts
  - Rich text editor for content creation
  - Category-based organization
  - Image upload support with Cloudinary

- **Interactive Features**
  - Comment system
  - User profiles
  - Related blog suggestions
  - Search functionality

- **Admin Features**
  - Category management
  - User management
  - Content moderation

- **UI/UX**
  - Responsive design
  - Dark/Light theme toggle
  - Modern and clean interface

## 🛠️ Technologies Used

### Frontend
- React.js
- Redux (State Management)
- Tailwind CSS
- Vite
- Firebase (Google Authentication)

### Backend
- Node.js
- Express.js
- MongoDB
- Cloudinary (Image Storage)
- JWT Authentication

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/SidhantNaik/Blog-Hub.git
cd Blog-Hub
```

2. Install dependencies for both frontend and backend
```bash
# Install API dependencies
cd Api
npm install

# Install Client dependencies
cd ../Client
npm install
```

3. Set up environment variables

Create `.env` files in both Api and Client directories:

For Api/.env:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For Client/.env:
```env
VITE_API_URL=your_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

4. Start the development servers

```bash
# Start the API server (from Api directory)
npm start

# Start the client development server (from Client directory)
npm run dev
```

## 🏗️ Project Structure

```
Blog-Hub/
├── Api/                    # Backend server
│   ├── Config/            # Configuration files
│   ├── Controllers/       # Request handlers
│   ├── Models/            # Database models
│   └── Routes/            # API routes
│
└── Client/                # Frontend application
    ├── src/
    │   ├── Components/    # Reusable components
    │   ├── Pages/         # Page components
    │   ├── context/       # React context
    │   ├── redux/         # Redux state management
    │   └── Hooks/         # Custom React hooks
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google authentication

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get specific blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Firebase](https://firebase.google.com/)