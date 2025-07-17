# 📸 CVP16 - Auth API Backend

This is the authentication backend for the **CVP16 project**, a platform that allows users to book photographers and videographers in their area. This module handles:

- ✅ User Registration  
- 🔐 OTP-based Email Verification  
- 🔓 Login with JWT Authentication  

Built using **Node.js**, **Express**, **MongoDB**, **Mongoose**, **JWT**, **bcryptjs**, and **Nodemailer**.

## 🚀 Features

- Secure user registration with input validation and password hashing  
- Email verification using 6-digit OTP via Nodemailer (Gmail)  
- JWT-based login system  
- Date of birth is stored in **UTC** after converting from **IST**  
- Clean modular code structure

## 📂 Project Structure

booking-cvp16/
├── controllers/
│ └── userController.js
├── models/
│ └── User.js
├── routes/
│ └── userRoutes.js
├── utils/
│ ├── convertToUTC.js
│ ├── generateOtp.js
│ └── sendEmail.js
├── .env.example
├── server.js
├── package.json
└── README.md



## ⚙️ Environment Setup

Create a `.env` file in the root directory using the `.env.example` template:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
⚠️ Do not push .env to GitHub. It’s listed in .gitignore.

🧪 How to Run Locally
1. Clone the Repository

git clone https://github.com/your-username/booking-cvp16.git
cd booking-cvp16

2. Install Dependencies
npm install
3. Start the Server
node server.js

Server will run at:
http://localhost:5000
📮 API Endpoints Overview
Method	Endpoint	Description
POST	/api/users/send-otp	Register user and send OTP to email
POST	/api/users/verify-otp	Verify the received OTP
POST	/api/users/login	Login using verified credentials

🔌 Sample API Testing Requests
Use tools like Postman or Thunder Client to test these endpoints.

✅ 1. Register User and Send OTP
POST http://localhost:5000/api/users/send-otp

Request Body:
{
  "firstName": "Mohammed",
  "lastName": "Tauheed",
  "email": "mohdabdultauheed098@gmail.com",
  "password": "cvp16secure@123",
  "dateOfBirth": "18-07-2003",
  "genderPreference": "Male"
}

Response:

{
  "message": "User created. OTP sent to email."
}

🔁 2. Verify OTP
POST http://localhost:5000/api/users/verify-otp

Request Body:
{
  "email": "mohdabdultauheed098@gmail.com",
  "otp": 123456
}
Replace 123456 with the actual OTP you received in email.

Response:
{
  "message": "Account verified successfully"
}

🔓 3. Login
POST http://localhost:5000/api/users/login

Request Body:
{
  "email": "mohdabdultauheed098@gmail.com",
  "password": "cvp16secure@123"
}
Response:
{
  "token": "JWT_TOKEN_HERE"
}
Use this token in Authorization: Bearer <token> header to access protected routes (if any).

🧠 Tech Stack
Node.js

Express.js

MongoDB & Mongoose

JWT (JSON Web Tokens)

bcryptjs (Password Hashing)

Nodemailer (Email OTP)

dotenv (Environment Management)

👨‍💻 Author
Mohammed Abdul Tauheed
Backend Developer – CVP16 Project
Email: mohdabdultauheed098@gmail.com

📌 Notes
If OTP expires, re-registration should be handled manually (or an endpoint for resend OTP can be added).

**⚠️** Use tools like Gmail App Passwords for SMTP_PASSWORD if 2FA is enabled.

