# Vercel Deployment Guide

## Issues Fixed

The main issues causing your Vercel deployment error were:

1. **Socket.IO incompatibility**: Vercel serverless functions don't support WebSocket connections
2. **Missing serverless configuration**: No proper Vercel configuration for API routes
3. **Incorrect export structure**: Server was configured for traditional Node.js deployment

## Environment Variables Required

Before deploying to Vercel, you must set these environment variables in your Vercel dashboard:

### Backend Environment Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/business-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
NODE_ENV=production
FRONTEND_URL=https://your-app-name.vercel.app
```

### Frontend Environment Variables
```
REACT_APP_API_URL=https://your-app-name.vercel.app/api
REACT_APP_SOCKET_URL=https://your-app-name.vercel.app
```

## Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add all the environment variables listed above

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Files Modified

- `vercel.json` - Vercel configuration for serverless deployment
- `backend/api/vercel.ts` - Serverless API entry point (Socket.IO removed)
- `backend/src/server.ts` - Updated to work with both local and Vercel deployment
- `backend/package.json` - Added @vercel/node dependency

## Important Notes

1. **Socket.IO Limitation**: Real-time features using Socket.IO won't work on Vercel. For production, consider:
   - Using Pusher or Ably for real-time features
   - Deploying backend separately on a platform that supports WebSockets

2. **Database Connection**: Ensure your MongoDB URI allows connections from Vercel's IP ranges

3. **CORS Configuration**: The frontend URL in environment variables must match your deployed Vercel app URL

## Troubleshooting

If you still get errors after deployment:

1. Check Vercel function logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is valid and accessible
4. Check that the build process completes successfully

## Alternative Deployment Options

If you need Socket.IO functionality, consider:
- Deploying backend to Railway, Render, or Heroku
- Using Vercel for frontend only
- Implementing real-time features with polling instead of WebSockets
