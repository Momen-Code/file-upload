### Project Setup and Running Guide

#### **Prerequisites**

Before starting, ensure you have the following installed on your system:

1. **Node.js and pnpm**:

   - Install Node.js (recommended version >= 16).
   - Install pnpm globally:
     ```bash
     npm install -g pnpm
     ```

2. **Database**:

   - PostgreSQL installed and running.
   - Create a database for the project and note the connection details.

3. **Redis** (for queue management):

   - Install and start Redis locally or use a hosted Redis service.

4. **Environment Variables**:

   - Create a `.env` file in the root and backend directories (if required separately).
   - Define the following variables in the backend `.env` file:
     `  
     NODE_ENV=
     PORT=
     DATABASE_URL=
     ACCESS_TOKEN_PRIVATE_KEY_ADMIN=
     ACCESS_TOKEN_PUBLIC_KEY_ADMIN=
     ACCESS_TOKEN_PRIVATE_KEY_USER=
     ACCESS_TOKEN_PUBLIC_KEY_USER=
     REDIS_HOST=

   `

   - Additional variables may include API keys or other configurations as needed.

---

#### **Steps to Setup and Run**

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:

   - Install dependencies for the frontend:
     ```bash
     cd frontend
     pnpm install
     ```
   - Install dependencies for the backend:
     ```bash
     cd ../backend
     pnpm install
     ```
   - Install dependencies in the root directory (if there are shared configurations or scripts):
     ```bash
     cd ..
     pnpm install
     ```

3. **Run the Project**:
   - Start the development environment:
     ```bash
     pnpm dev
     ```

---

#### **Backend Configuration**

- Ensure the PostgreSQL database is running and accessible.
- Run database migrations:
  ```bash
  pnpm prisma migrate dev
  ```
- Seed the database (if applicable):
  ```bash
  pnpm prisma db seed
  ```

---

#### **Frontend Configuration**

- Ensure the frontend `.env` file contains the correct backend API URL.
- Start the frontend development server:
  ```bash
  pnpm dev
  ```

---

#### **Testing the Setup**

- **Frontend**: Visit the frontend URL (usually `http://localhost:3000`) in your browser.
- **Backend**: Test the API using a tool like Postman or by visiting the API endpoints directly.

---

#### **Development Notes**

- **Queues**: Verify Redis is running for task queueing.

---
