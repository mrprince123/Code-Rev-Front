# Code Review Platform - Frontend (React.js + Redux Toolkit)

## Overview
This repository contains the frontend code for the Code Review Platform, built using React.js and Redux Toolkit. The platform allows developers to submit code snippets for review, receive feedback, and collaborate with other developers. Reviewers can provide comments, rate submissions, and approve or like code snippets. The frontend is designed to be responsive, user-friendly, and integrates seamlessly with the backend API.

## Features

### User Authentication
- Login and registration using JWT-based authentication.
- Role-based access (Developer/Reviewer).

### Code Submission
- Submit code snippets with title, description, language, and tags.
- Set visibility (Public/Private) and track submission status (Pending/Approved/Rejected).

### Review & Feedback
- Add comments on specific lines of code.
- Rate submissions (1-5 stars).
- Like or approve code submissions.

### Notifications
- Real-time notifications for reviews, likes, and approvals.
- Mark notifications as read/unread.

### Dashboard & Profile
- View submission and review history.
- Track metrics like total reviews, likes, and approvals.
- Update profile information and social links.

### Homepage
- Browse public code submissions without logging in.
- Log in to interact with submissions (review, like, approve).

## Tech Stack
- **Frontend Framework:** React.js
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS / Material-UI
- **Routing:** React Router DOM
- **API Integration:** Axios
- **Authentication:** JWT (stored in localStorage)
- **Notifications:** Real-time updates using WebSocket or polling.

## Folder Structure
```
src/
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components
│   ├── CodeEditor/       # Code editor component
│   ├── Navbar/           # Navigation bar
│   ├── Footer/           # Footer component
│   ├── Notification/     # Notification dropdown
│   └── ...               # Other components
├── features/             # Redux Toolkit slices
│   ├── authSlice.js      # Authentication state
│   ├── codeSlice.js      # Code submission state
│   ├── reviewSlice.js    # Review state
│   ├── likeSlice.js      # Like/approval state
│   └── notificationSlice.js # Notification state
├── pages/                # Application pages
│   ├── HomePage/         # Homepage with public submissions
│   ├── LoginPage/        # Login and registration
│   ├── ProfilePage/      # User profile and settings
│   ├── Dashboard/        # User dashboard
│   ├── SubmissionPage/   # Code submission form
│   ├── ReviewPage/       # Code review page
│   └── ...               # Other pages
├── services/             # API service layer
│   ├── authService.js    # Authentication API calls
│   ├── codeService.js    # Code submission API calls
│   ├── reviewService.js  # Review API calls
│   └── ...               # Other services
├── utils/                # Utility functions
│   ├── auth.js           # Authentication helpers
│   ├── notifications.js  # Notification helpers
│   └── ...               # Other utilities
├── App.js                # Main application component
├── index.js              # Entry point
└── store.js              # Redux store configuration
```

## Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/code-review-platform-frontend.git
```

### Navigate to the project directory:
```bash
cd code-review-platform-frontend
```

### Install dependencies:
```bash
npm install
```

### Start the development server:
```bash
npm start
```

Open your browser and visit `http://localhost:3000`.

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_SECRET=your_jwt_secret
```

## Redux Toolkit Setup
Each feature (e.g., authentication, code submissions, reviews) has its own slice.

### Example: `authSlice.js`
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

## API Integration
API calls are handled using Axios. Each service contains methods for interacting with the backend.

### Example: `authService.js`
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
```

## Styling
The application uses Tailwind CSS for styling.

### Example: `tailwind.config.js`
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#DB2777',
      },
    },
  },
  plugins: [],
};
```

## Future Enhancements
- **Real-time Notifications:** Implement WebSocket for real-time updates.
- **AI-based Suggestions:** Integrate AI for automated code review suggestions.
- **Code Execution:** Allow users to run and test code snippets directly in the browser.

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any questions or feedback, reach out to:
- **Email:** princekrdss2018@gmail.com
- **GitHub:** https://github.com/mrprince123

## Acknowledgments
- React.js
- Redux Toolkit
- Tailwind CSS
- Material-UI
- Axios

Happy coding! 🚀
