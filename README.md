# Task-Manager

Task Manager is a simple task management application where users can add, edit, and delete tasks.It allows users to create an account, add tasks to their collection.

## Features

- User authentication: Users can create an account, log in, and log out to access personalized features.
- task management: Users can add tasks to their collection, including task details such as title, description and due date.
- Search functionality: Users can search for tasks based on title, description.
- Filter functionality: Users can filter tasks based on start and end dates.
- Responsive design: The application is optimized for various screen sizes, ensuring a seamless experience across devices.

## Technologies Used

- Frontend: React+Vite, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT)

## Getting Started

To get started with the Task Manager application, follow the instructions below.

### Prerequisites

- Node.js (version >= 12.0.0)
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
    https://github.com/VijayKumarReddyTalakola/Task-Manager.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Task-Manager
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Create a `.env` file in the server directory of the project and add the following environment variables:

   ```bash
   MONGO_URI="your-mongodb-uri"
   SECRET="your-jwt-secret"
   ```

5. Start the development servers for the client and the server:

- Open a terminal and navigate to the client folder:
  ```bash
  cd client
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- Open another terminal and navigate to the server folder:
  ```bash
  cd server
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- The application will be accessible at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## Contributing

Contributions are welcome! To contribute to the project, follow the steps below:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push your changes to the branch
6. Submit a pull request
7. Wait for your pull request to be reviewed and merged
8. Celebrate! 🎉
9. (Optional) Consider starring the repository! ⭐
10. (Optional) Consider following me on GitHub! 🙌
11. (Optional) Consider contributing again! 😎
12. (Optional) Consider sharing the project with your friends! 👨‍👩‍👧‍👦
13. (Optional) Consider tweeting about the project! 🐦

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.
