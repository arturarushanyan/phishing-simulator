# Phishing Simulation Platform

A full-stack application for conducting and monitoring phishing simulation campaigns. This platform allows organizations to test their employees' security awareness by sending simulated phishing emails and tracking their responses.

## Technologies Used

### Backend
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **MongoDB**: NoSQL database for storing phishing attempts and campaign data
- **Nodemailer**: Email service for sending phishing simulation emails
- **TypeScript**: For type-safe code and better developer experience

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For handling client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for making API requests

## Project Structure

```
nestjs-phishing/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Application entry point
│   └── package.json
│
├── server/                # NestJS backend application
│   ├── src/
│   │   ├── phishing/     # Phishing module
│   │   ├── email/        # Email service module
│   │   └── main.ts       # Application entry point
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- SMTP server credentials

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/phishing-sim
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development Decisions

1. **Architecture**
   - Chose NestJS for its modular architecture and built-in TypeScript support
   - Used React for the frontend due to its component-based architecture and large ecosystem
   - Implemented a clean separation between frontend and backend services

2. **Database**
   - Selected MongoDB for its flexibility in handling document-based data
   - Designed schemas to efficiently track phishing attempts and their status

3. **Email Handling**
   - Implemented a robust email service using Nodemailer
   - Created HTML email templates for different phishing scenarios
   - Added tracking functionality to monitor email opens and link clicks

4. **Security**
   - Implemented proper error handling and logging
   - Added input validation for all API endpoints
   - Ensured secure handling of sensitive data

## Some Caveats and missing functionality

- Unfortunately I haven't implemented the authentication part. Just didn't had time for it
- Skipped the devops part as well as I don't have much experience with it and attempt of implementing it would have been wase of time
- I haven't done any proper code review. I'm sure if I look at all this with a fresh eye, I will find some things that are not efficient or need refactoring


## License

This project is licensed under the MIT License - see the LICENSE file for details.