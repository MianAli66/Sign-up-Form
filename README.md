# 🧾 Sign-up Page

This project is a simple and responsive **Sign-up Page** built using **HTML, CSS, JavaScript**, and **Node.js with EJS**.  
It allows users to register with email verification, password validation, and a clean, modern interface.

---

## 🚀 Features
- Responsive and clean user interface  
- Form validation (email, password, OTP, etc.)  
- OTP verification system  
- Secure password handling with bcrypt  
- Node.js + Express backend  
- PostgreSQL database integration  

---

## 🛠️ Technologies Used
- **Frontend:** HTML, CSS, EJS  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Email Service:** Nodemailer  

---

## ⚙️ How to Run
1. Clone this repository:
```bash
git clone https://github.com/MianAli66/Sign-up-Form.git
```

   git clone https://github.com/MianAli66/Sign-up-Form.git
2. Navigate to the project folder:
    ```bash
    
    cd Sign-up-Form 
    ```

4. Install dependencies:
   ```bash
   npm install```
6. Run the app:
   ```bash
   node index.js ```
8. Open your browser and visit:
   ```bash
     http://localhost:3000 ```

   ## Database Setup
1. Install PostgreSQL on your system.  
2. Open SQL shell (psql) and run:
   ```sql
   CREATE DATABASE signup;
   ```
3. In your project, update the connection in `index.js`:
   ```js
   const db = new pg.Client({
     user: "postgres",
     host: "localhost",
     database: "signup",
     password: "your_password",
     port: 5432
   });
   db.connect();
   ```


