# Business Dashboard - MERN TypeScript Application

A comprehensive business analytics dashboard built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This application provides real-time business insights with role-based access control, interactive charts, and data management capabilities.

## Features

### Core Features
- **User Authentication**: Secure login/logout with JWT tokens
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Interactive Dashboard**: Real-time statistics and charts
- **Sales Management**: Track and manage sales data with filtering
- **Revenue Management**: Monitor revenue streams and sources
- **Data Visualization**: Beautiful charts using Recharts
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Advanced Features
- **Real-time Updates**: WebSocket integration for live data
- **Data Filtering**: Filter by date ranges, categories, and sources
- **Export Functionality**: Export data to CSV/PDF (bonus features)
- **Secure API**: Rate limiting, CORS, and security headers
- **TypeScript**: Full type safety across the application

## Tech Stack

### Backend
- **Node.js** with TypeScript
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time updates
- **bcryptjs** for password hashing
- **helmet** and **express-rate-limit** for security

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Axios** for API calls
- **Heroicons** for icons
- **date-fns** for date formatting

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd business-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Environment Variables
Create a `.env` file in the backend directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/business-dashboard

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Database Setup
Make sure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance.

#### Seed Data (Optional)
To populate the database with sample data:
```bash
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `user@example.com` / `user123`
- Sample sales and revenue data

#### Start Backend Server
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

#### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

#### Start Frontend Server
```bash
npm start
```

The frontend application will start on `http://localhost:3000`

## Usage

### 1. Access the Application
Open your browser and navigate to `http://localhost:3000`

### 2. Login
Use the seeded credentials or create a new account:
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

### 3. Dashboard Navigation
- **Dashboard**: Overview with statistics and charts
- **Sales**: Manage sales data with filters
- **Revenue**: Track revenue sources and amounts
- **Users** (Admin only): User management

### 4. Features
- View real-time statistics
- Filter data by date and category
- Add new sales and revenue records
- Export data (CSV/PDF)
- Responsive design for mobile devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/sales` - Get sales data with filters
- `GET /api/dashboard/revenue` - Get revenue data with filters
- `GET /api/dashboard/chart` - Get chart data
- `POST /api/dashboard/sales` - Create new sale
- `POST /api/dashboard/revenue` - Create new revenue

## Project Structure

```
business-dashboard/
backend/
  src/
    config/       # Database configuration
    controllers/  # API controllers
    middleware/   # Authentication middleware
    models/       # Mongoose models
    routes/       # API routes
    types/        # TypeScript types
    utils/        # Utility functions
    server.ts     # Main server file
frontend/
  src/
    components/   # React components
      Auth/       # Authentication components
      Dashboard/  # Dashboard components
      Layout/     # Layout components
    contexts/     # React contexts
    services/     # API services
    types/        # TypeScript types
    App.tsx       # Main App component
```

## Development Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Security headers with helmet
- Role-based access control
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] Data backup and restore
- [ ] Multi-tenant support
- [ ] Integration with third-party APIs
- [ ] Advanced user permissions
- [ ] Audit logging
- [ ] Performance optimization

## Support

For any questions or issues, please open an issue on the GitHub repository.
