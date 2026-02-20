# ☕ Get Me a Chai

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7.1.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.13-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-2.9.6-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9.2.1-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

A modern crowdfunding platform where creators can receive support from their fans. Built with Next.js 16, MongoDB, and Razorpay for seamless payment processing.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/yourusername/get-me-a-chai)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 🌟 Features

- **GitHub Authentication** - Secure login with NextAuth.js
- **Dynamic User Profiles** - Customizable profile and cover pictures
- **Payment Integration** - Accept donations via Razorpay
- **Real-time Dashboard** - Manage your profile and view supporters
- **Responsive Design** - Beautiful UI with Tailwind CSS
- **Database Storage** - MongoDB for user data and payment tracking


## 🛠️ Tech Stack

### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=flat-square&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.1.0-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9.2.1-880000?style=flat-square&logo=mongoose&logoColor=white)

### Authentication & Payments
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.13-000000?style=flat-square&logo=next.js&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-2.9.6-0C2451?style=flat-square&logo=razorpay&logoColor=white)
![GitHub OAuth](https://img.shields.io/badge/GitHub_OAuth-181717?style=flat-square&logo=github&logoColor=white)

### DevOps & Tools
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- GitHub OAuth App credentials
- Razorpay account (for payment processing)

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/get-me-a-chai.git
cd get-me-a-chai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# MongoDB
MONGODB_URI=mongodb://localhost:27017/get_me_chai
# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/get_me_chai

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Razorpay
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_secret
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set **Homepage URL** to `http://localhost:3000`
4. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`
5. Copy the Client ID and Client Secret to your `.env.local`

### MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB locally
- Start the MongoDB service
- Use `mongodb://localhost:27017/get_me_chai` as your URI

**Option 2: MongoDB Atlas (Recommended for Production)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP to the whitelist (or allow all: 0.0.0.0/0)
4. Get your connection string and update `.env.local`

### Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate test keys for development
4. Add them to your `.env.local`

## 📁 Project Structure

```
get-me-a-chai/
├── app/
│   ├── [username]/          # Dynamic user profile pages
│   │   └── page.js
│   ├── action/              # Server actions
│   │   └── useraction.js
│   ├── api/                 # API routes
│   │   └── auth/
│   ├── dashboard/           # User dashboard
│   │   └── page.js
│   ├── login/               # Login page
│   └── layout.js
├── components/
│   ├── Navbar.js            # Navigation bar
│   └── Footer.js            # Footer component
├── db/
│   └── connectDB.js         # MongoDB connection
├── models/
│   ├── User.js              # User schema
│   └── payments.js          # Payment schema
├── public/                  # Static assets
├── .env.local               # Environment variables (create this)
└── package.json
```

## 🎯 Usage

1. **Sign Up/Login** - Use GitHub authentication to create an account
2. **Set Up Profile** - Go to Dashboard and add your details:
   - Name, username, email
   - Profile and cover pictures (URL)
   - Razorpay credentials
3. **Share Your Page** - Your profile will be at `yoursite.com/yourusername`
4. **Receive Support** - Fans can visit your page and send chai (donations)!

## 🚢 Deployment

### Deploy on Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add all environment variables from `.env.local`
   - Update `NEXTAUTH_URL` to your Vercel URL
   - Deploy!

3. **Update OAuth URLs**
   - Update GitHub OAuth callback URL to your Vercel domain
   - Update `NEXTAUTH_URL` in Vercel environment variables

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check if MongoDB is running
- Verify `MONGODB_URI` is correct in `.env.local`
- Ensure all environment variables are set

### Authentication not working
- Verify GitHub OAuth credentials
- Check if `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is set

### Payment issues
- Verify Razorpay credentials are correct
- Check if user has added Razorpay keys in dashboard
- Ensure Razorpay script is loaded

## 📊 Package Dependencies

```json
{
  "dependencies": {
    "mongodb": "^7.1.0",
    "mongoose": "^9.2.1",
    "next": "16.1.6",
    "next-auth": "^4.24.13",
    "razorpay": "^2.9.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "tailwindcss": "^4"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [https://github.com/awais4212)
- Email: awaisalihashmi@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- Razorpay for payment processing
- Tailwind CSS for styling

## 📈 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/yourusername/get-me-a-chai?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/get-me-a-chai?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/get-me-a-chai)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/get-me-a-chai)

---

Made with ☕ and ❤️

**Support this project by buying me a chai!** 😊
[My Profile Link](https://github.com/awais4212)
