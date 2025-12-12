# Frontend - AI-Powered Notes Summarizer

This is the website where people use the AI-Powered Notes Summarizer. Made with Next.js and React, it's where you log in, paste your notes to get summaries, and see what you've summarized before.

## What Can You Do Here?

- Create an account and log into your profile
- Go to a dashboard and paste any text to get a summary
- See a list of all the summaries you've made
- Check the important action items, risks, and next steps from each summary
- Use it on your phone, tablet, or computer - it works everywhere

## What You Need First

Before you start:
- **Node.js** version 18 or newer
- **npm** (it comes with Node.js)
- The server running on `http://localhost:5000`

## Getting Everything Ready

1. Go into the frontend folder:

```bash
cd frontend
```

2. Download the code it needs:

```bash
npm install
```

## Starting It Up

Run this to start it:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser. Whenever you save changes to the code, it will refresh automatically.

## Commands to Use

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start it up with automatic updates |
| `npm run build` | Get it ready to put on the internet |
| `npm start` | Run the version that's ready for the internet |

## How It's Organized

```
src/
├── app/
│   ├── layout.js              # The main container
│   ├── page.js                # The opening page (goes to login)
│   ├── globals.css            # How things look
│   ├── login/
│   │   └── page.js            # Where you log in
│   ├── signup/
│   │   └── page.js            # Where you make an account
│   ├── dashboard/
│   │   └── page.js            # Where you make summaries
│   └── historypage/
│       └── page.js            # Where you see old summaries
└── components/
    ├── Button.js              # Click me buttons
    ├── InputAera.js           # Type text here
    ├── TextAera.js            # Type longer text here
    └── Loader.js              # Loading spinner
```

## Pages Explained

- **Login** (`/login`) - Enter your email and password to get in
- **Sign Up** (`/signup`) - Make a new account
- **Dashboard** (`/dashboard`) - Paste text and it gets turned into a summary
- **History** (`/historypage`) - Look at all the summaries you made before

## Things You Should Know

- It connects to the server at `http://localhost:5000`
- When you log in, your key gets saved so you stay logged in
- Every time you ask for a summary, it sends your key to prove it's you
- When you open the website, it sends you to the login page

## What It Uses

- **Next.js 16** - The framework that runs it
- **React 19** - The library that makes it work
- **Axios** - Sends messages to the server
- **React Hook Form** - Helps with typing forms
- **Tailwind CSS** - Makes it look nice
- **Lucide React** - Little pictures and icons
- **React Hot Toast** - Little messages that pop up

## If Something Goes Wrong

**Can't reach the server:**
- Check that the server is running on `http://localhost:5000`
- Make sure the server has CORS turned on

**Port 3000 is being used:**
```bash
npm run dev -- -p 3001
```

**It's broken and you need to start over:**
```bash
rm -r node_modules .next
npm install
npm run dev
```

---

## Want to See How This Works? (Video Script)

Here's what to show in a quick 3-5 minute video:

### Introduction (0:00 - 0:30)

"Hey! This is the AI-Powered Notes Summarizer. It's a simple web app that takes your long notes and turns them into quick summaries using AI. Let me show you how it all works behind the scenes and how we built it."

### Architecture Overview (0:30 - 1:30)

"So the app has two main parts - a frontend where you interact with it, and a backend server that does all the heavy lifting.

On the frontend, we're using Next.js and React. That's just fancy ways of saying we're making a modern website that's fast and works smoothly.

On the backend, we have a Node.js server running NestJS. This server listens for requests from the website, talks to the database to store and retrieve data, and connects to Groq's AI service to generate summaries.

The database is PostgreSQL - that's where all your user accounts, passwords, and summaries get saved safely.

When you open the website and log in, your browser gets a security token that proves you're logged in. Every time you ask for a summary, you send this token along so the server knows it's actually you."

### How Summarization Works (1:30 - 3:00)

"Let me walk through what happens when you paste text and hit 'Create Summary':

First, the text goes from your browser to the backend server. The server checks your login token to make sure you're who you say you are. If everything's good, it takes your text and sends it to Groq's AI model.

The AI reads your text and creates a summary - just the important parts. But it doesn't stop there. It also pulls out actionable items - things you need to do. It identifies risks - things that could go wrong. And it gives you next steps - what to do about everything.

All of this gets formatted nicely and sent back to your browser. Your page shows the summary, the action items, risks, and next steps all organized and easy to read.

Then the server saves all this to the database so you can look at it again later. When you go to the History page, it pulls up all your old summaries from the database.

Everything is encrypted and secure - your password gets scrambled using Bcrypt so nobody can see it, and your login token expires after a certain time so old tokens can't be used."

### What We Learned (3:00 - 4:00)

"Building this taught us a lot. We learned how to build a real, working full-stack application - that means both the website part and the server part working together.

We learned about security - how to hash passwords, how to use JWT tokens for login sessions, how to make sure only logged-in users can do things.

We learned how to use modern AI APIs - taking advantage of services like Groq to do the smart stuff without having to build AI from scratch.

We learned that keeping things simple is better. We didn't overthink it - just a login page, a place to paste text, and a history page. Clean and straightforward.

And we learned that real-world applications are more than just code - you need to think about databases, security, third-party services, and making sure everything talks to each other correctly."

### Wrapping Up (4:00 - 4:30)

"If you want to try this yourself, just clone the repository from GitHub, follow the setup instructions in the README, and you'll have your own version running. It's actually pretty straightforward once you get the hang of it.

The backend runs on port 5000, the frontend runs on port 3000, and they talk to each other through HTTP requests. Pretty cool, right?

Thanks for watching - feel free to check out the code and build on it!"

### Optional: Deployment (4:30 - 5:00)

"If you want to put this on the internet for real, the frontend can go on Vercel - they have special support for Next.js apps. The backend can go on services like Railway or Render that host Node.js applications. And PostgreSQL databases can be hosted on platforms like Supabase or AWS. But that's for another video!"
